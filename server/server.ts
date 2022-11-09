import express from "express";
const app = express();
import compression from "compression";
import path from "path";
import * as db from "./db";
import * as dotenv from "dotenv";
dotenv.config();
import cryptoRandomString, { async } from "crypto-random-string";
import { QueryResult } from "pg";
import { uploader, s3Uploader, cookieSessionMW } from "./middleware";
import {
    User,
    UserRelation,
} from "../client/src/components/component-interfaces";
import { Friendship } from "../client/src/redux/friendships/slice";
import http from "http";
import { Server } from "socket.io";
import { idText } from "typescript";
import { Socket } from "socket.io";
import { addOnlineUser, checkOnlineUsers } from "./check-online-users";
import { Request, Response, NextFunction } from "express";
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:3000"));
    },
});
io.use((socket, next) => {
    cookieSessionMW(
        socket.request as Request,
        {} as Response,
        next as NextFunction
    );
});

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSessionMW);

io.on("connection", async (socket) => {
    const { userId } = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    }
    const allSockets = await io.allSockets();
    const socketsArray = Array.from(allSockets.values());
    checkOnlineUsers(socketsArray);

    const onlineUser = await db
        .getUserInfo(userId)
        .then((entry: QueryResult) => entry.rows[0]);
    addOnlineUser(onlineUser.id, socket.id);
    io.emit("userOnline", onlineUser);

    const latestMessages = await db
        .getLatestMessages()
        .then((entries: QueryResult) => entries.rows);
    socket.emit("globalMessages", latestMessages);

    const onlineUsers = await db
        .getOnlineUsers()
        .then((entries: QueryResult) => entries.rows);
    socket.emit("onlineUsers", onlineUsers);

    socket.on("globalMessage", async (data: { message: string }) => {
        const { id, sender_id, message, created_at } = await db
            .insertMessage(userId, data.message)
            .then((entries: QueryResult) => entries.rows[0]);
        const { first, last, url } = await db
            .getUserInfo(userId)
            .then((entries: QueryResult) => entries.rows[0]);
        io.emit("globalMessage", {
            id,
            sender_id,
            first,
            last,
            url,
            message,
            created_at,
        });
    });

    socket.on("userWentOffline", async (userId: string) => {
        console.log("user went offline");
        io.emit("userOffline", userId);
    });
    socket.on("disconnect", () => {});
});

//can't use contentSecurityPolicy feature bc I don't know how to set an exception, not only for a specific link but a link that starts with: https://s3.amazonaws.com/spicedling
// app.use(
//     Helmet({
//         contentSecurityPolicy: false,
//     })
// );

// app.use((req, res, next) => {
//     console.log("---------------------");
//     console.log("req.url:", req.url);
//     console.log("req.method:", req.method);
//     console.log("req.session:", req.session);
//     console.log("req.body:", req.body);
//     console.log("---------------------");
//     next();
// });

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.post("/registration.json", (req, res) => {
    db.insertUser(req.body)
        .then((entry) => {
            req.session.userId = entry.rows[0].id;
            res.json({ success: true, onlineUser: entry.rows[0] });
        })
        .catch(() => {
            res.json({ success: false });
        });
});

app.post("/login.json", (req, res) => {
    db.getUserByEmail(req.body.email)
        .then((entry) => {
            const userId = entry.rows[0].id;
            const { id, first, last, url, bio, online } = entry.rows[0];
            const onlineUser = { id, first, last, url, bio, online };
            db.authenticateUser(entry.rows[0].password, req.body.password).then(
                (authenticated) => {
                    if (authenticated) {
                        req.session.userId = userId;
                        db.userGoesOnline(userId);
                        onlineUser.online = true;
                        res.json({
                            success: true,
                            onlineUser: onlineUser,
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
    const { userId } = req.session;
    console.log("logging out: ", userId);
    db.userGoesOffline(userId).then(() => {
        req.session = null;
        res.json({ success: true, userId });
    });
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
    const { userId } = req.session;
    const searchString = req.params.query;
    const searchArr = searchString.split("-");
    if (searchArr.length === 1) {
        db.findFriends(searchArr[0])
            .then((entries: QueryResult) => {
                const findFriendsResults: User[] = entries.rows.filter(
                    (user: User) => user.id !== userId
                );
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
    const { userId } = req.session;
    if (userId == profileId) {
        return res.json({ success: false, ownProfile: true });
    } else {
        db.getUserInfo(profileId)
            .then((entry: QueryResult) => {
                const userData: User | {} = entry.rows[0] || {};
                if (userData.hasOwnProperty("id")) {
                    res.json({ success: true, userData });
                } else {
                    res.json({ success: false, ownProfile: false });
                }
            })
            .catch((err: Error) => console.log(err));
    }
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
            const { first, last, url, bio, online } = entry.rows[0];
            res.json({ userData: { first, last, url, bio, online }, userId });
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
    db.cancelFriendRequest(ownerId, viewerId)
        .then(() => {
            res.json({
                success: true,
                newRelation: "none",
            });
        })
        .catch(() => res.json({ success: false, newRelation: null }));
});

app.get("/friendships", (req, res) => {
    const { userId } = req.session;
    db.getFriendList(userId).then((entries: QueryResult) => {
        res.json({ success: true, friendships: entries.rows });
    });
});

app.get("/friend-relation/:owner", (req, res) => {
    const viewerId = String(req.session.userId);
    const ownerId = req.params.owner;
    db.getFriendship({ viewerId, ownerId }).then((entry: QueryResult) => {
        const friendInfo: Friendship[] = entry.rows[0];
        res.json({ success: true, friendInfo });
    });
});

app.get("*", function (req, res): void {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

httpServer.listen(process.env.PORT || 3001, function (): void {
    console.log("I'm listening.");
});
