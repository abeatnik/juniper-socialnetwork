import express from "express";
const app = express();
import compression from "compression";
import path from "path";
import cookieSession from "cookie-session";
import Helmet from "helmet";
import * as db from "./db";
import * as dotenv from "dotenv";
import cryptoRandomString, { async } from "crypto-random-string";
import { QueryResult } from "pg";
import { uploader, s3Uploader } from "./middleware";
import {
    User,
    UserRelation,
} from "../client/src/components/component-interfaces";
import {Friendship} from "../client/src/redux/friendships";

dotenv.config();
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
        signed: false,
    })
);

//can't use contentSecurityPolicy feature bc I don't know how to set an exception, not only for a specific link but a link that starts with: https://s3.amazonaws.com/spicedling
// app.use(
//     Helmet({
//         contentSecurityPolicy: false,
//     })
// );

app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("req.body:", req.body);
    console.log("---------------------");
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.post("/registration.json", (req, res) => {
    db.insertUser(req.body)
        .then((entry) => {
            req.session.userId = entry.rows[0].id;
            res.json({ success: true });
        })
        .catch(() => {
            res.json({ success: false });
        });
});

app.post("/login.json", (req, res) => {
    db.getUserByEmail(req.body.email)
        .then((entry) => {
            const userId = entry.rows[0].id;
            db.authenticateUser(entry.rows[0].password, req.body.password).then(
                (authenticated) => {
                    if (authenticated) {
                        req.session.userId = userId;
                        res.json({
                            success: true,
                        });
                    } else {
                        //password does not match
                        res.json({ success: false });
                    }
                }
            );
        })
        .catch(() => {
            ///email could not be found
            res.json({ success: false });
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.json();
});
app.post("/reset1", (req, res) => {
    db.getUserByEmail(req.body.email).then((entry) => {
        if (entry.rows[0].id) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.storeVerificationCode(entry.rows[0].email, secretCode)
                .then(() => {
                    res.json({ success: true });
                    console.log(secretCode);
                    //sends off email (this will be implemented later). For now you can just console.log the generated code
                })
                .catch((err: Error) => console.log(err));
        } else {
            res.json({ success: false });
        }
    });
});

app.post("/reset2", (req, res) => {
    const { email, code, newPassword } = req.body;
    db.checkVerificationCode(email).then((entry: QueryResult) => {
        if (entry.rows[0].code) {
            const trueCode = entry.rows[0].code;
            if (trueCode === code) {
                db.hashPassword(newPassword)
                    .then((newHash) => {
                        db.updateUserPassword(email, newHash)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch(() => res.json({ success: false }));
                    })
                    .catch(() => res.json({ success: false }));
            } else {
                res.json({ success: false });
            }
        } else {
            res.json({ success: false });
        }
    });
});

app.post("/profile-pic", uploader.single("file"), s3Uploader, (req, res) => {
    const { filename } = req.file;
    const userId = req.session.userId;
    const url = `https://s3.amazonaws.com/spicedling/${filename}`;
    db.insertProfilePic(url, userId)
        .then(res.json({ success: true, profileUrl: url }))
        .catch((err: Error) => console.log(err));
});

app.post("/save-bio", (req, res) => {
    const { userId } = req.session;
    const { newBio } = req.body;
    db.insertProfileBio(newBio, userId)
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((err: Error) => {
            res.json({
                success: false,
            });
        });
});

app.get("/recently-added", (req, res) => {
    db.getRecentlyAdded()
        .then((entries: QueryResult) => {
            const recentlyAdded: User[] = entries.rows;
            res.json(recentlyAdded);
        })
        .catch((err: Error) => console.log(err));
});

app.get("/find/:query", (req, res) => {
    const searchString = req.params.query;
    const searchArr = searchString.split("-");
    console.log("searchArr", searchArr);
    if (searchArr.length === 1) {
        db.findFriends(searchArr[0])
            .then((entries: QueryResult) => {
                const findFriendsResults: User[] = entries.rows;
                findFriendsResults.length === 0
                    ? res.json({ success: false })
                    : res.json({ success: true, findFriendsResults });
            })
            .catch();
    } else {
        db.findFriendsFullName(searchArr[0], searchArr[1])
            .then((entries: QueryResult) => {
                const findFriendsResults: User[] = entries.rows;
                findFriendsResults.length === 0
                    ? res.json({ success: false })
                    : res.json({ success: true, findFriendsResults });
            })
            .catch();
    }
});

app.get("/user-profile/:id", (req, res) => {
    const profileId = req.params.id;
    db.getUserInfo(profileId)
        .then((entry: QueryResult) => {
            const userData: User = entry.rows[0];
            if (userData.id === profileId) {
                res.json({ success: false, ownProfile: true });
            } else if (userData.id) {
                res.json({ success: true, userData });
            } else {
                res.json({ sucess: false, ownProfile: false });
            }
        })
        .catch((err: Error) => console.log(err));
});

app.get("/user/id.json", (req, res) => {
    if (req.session.userId) {
        const { userId } = req.session;
        res.json({ userId });
    } else {
        res.json({ userId: "" });
    }
});

app.get("/user-info", (req, res) => {
    if (req.session.userId) {
        const { userId } = req.session;
        db.getUserInfo(userId).then((entry: QueryResult) => {
            const { first, last, url, bio } = entry.rows[0];
            res.json({ userData: { first, last, url, bio }, userId });
        });
    } else {
        res.json({ userId: "" });
    }
});

app.get("/relation/:owner", (req, res) => {
    const userRelation: UserRelation = {
        ownerId: req.params.owner,
        viewerId: String(req.session.userId),
    };
    console.log("userRelation ", userRelation);
    db.getFriendRequestStatus(userRelation)
        .then((entry: QueryResult) => {
            let relation: "none" | "sent" | "received" | "friend" | null = null;
            
            if (entry.rows[0].id) {
                if (!entry.rows[0].accepted) {
                    if (userRelation.ownerId == entry.rows[0].sender_id) {
                        relation = "received";
                    } else {
                        relation = "sent";
                    }
                } else {
                    relation = "friend";
                }
            } else {
                relation = "none";
            }
            res.json({ success: true, relation: relation });
        })
        .catch(() => res.json({ success: true, relation: "none" }));
});

app.get("/friend-request/none/:owner", (req, res) => {
    const viewerId = String(req.session.userId);
    const ownerId = req.params.owner;
    db.insertFriendRequest(viewerId, ownerId)
        .then(() => {
            res.json({
                success: true,
                newRelation: "sent",
            });
        })
        .catch(() => res.json({ success: false, newRelation: null }));
});

app.get("/friend-request/sent/:owner", (req, res) => {
    const viewerId = String(req.session.userId);
    const ownerId = req.params.owner;
    db.cancelFriendRequest(viewerId, ownerId)
        .then(() => {
            res.json({
                success: true,
                newRelation: "none",
            });
        })
        .catch(() => res.json({ success: false, newRelation: null }));
});

app.get("/friend-request/received/:owner", (req, res) => {
    const viewerId = String(req.session.userId);
    const ownerId = req.params.owner;
    db.updateFriendRequestToAccepted(ownerId, viewerId)
        .then(() => {
            res.json({
                success: true,
                newRelation: "friend",
            });
        })
        .catch(() => res.json({ success: false, newRelation: null }));
});

app.get("/friend-request/friend/:owner", (req, res) => {
    const viewerId = String(req.session.userId);
    const ownerId = req.params.owner;
    //preliminary implementation
    db.cancelFriendRequest(viewerId, ownerId)
        .then(() => {
            res.json({
                success: true,
                newRelation: "none",
            });
        })
        .catch(() => res.json({ success: false, newRelation: null }));
});

app.get("/friendships", (req,res) => {
    const {userId} = req.session;
    db.getFriendList(userId).then((entries: QueryResult)=> {
        res.json({success: true, friendships: entries.rows});
    })
})

app.get("/friend-relation/:owner", (req,res)=>{
    const viewerId = String(req.session.userId);
    const ownerId = req.params.owner;
    db.getFriendship({viewerId, ownerId}).then((entry: QueryResult) => {
        const friendInfo: Friendship[] = entry.rows[0];
        res.json({success: true, friendInfo})
    })

})

app.get("*", function (req, res): void {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function (): void {
    console.log("I'm listening.");
});
