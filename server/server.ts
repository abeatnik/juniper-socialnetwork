import express from "express";
const app = express();
import compression from "compression";
import path from "path";
import cookieSession from "cookie-session";
import Helmet from "helmet";
import * as db from "./db";
import * as dotenv from "dotenv";
import cryptoRandomString from "crypto-random-string";
import { QueryResult } from "pg";
import { uploader, s3Uploader } from "./middleware";

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
    console.log(req.body);
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
    console.log(req.body);
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
    const userId = parseInt(req.session.userId);
    const url = `https://s3.amazonaws.com/spicedling/${filename}`;
    db.insertProfilePic(url, userId)
        .then(res.json({ success: true, profileUrl: url }))
        .catch((err: Error) => console.log(err));
});

app.get("/user/id.json", function (req, res) {
    if (req.session.userId) {
        const userId = req.session.userId;
        db.getUserInfo(parseInt(userId)).then((entry: QueryResult) => {
            const { firstname, lastname, url } = entry.rows[0];
            res.json({ userData: { firstname, lastname, url }, userId });
        });
    } else {
        res.json({ userId: "" });
    }
});

app.get("*", function (req, res): void {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function (): void {
    console.log("I'm listening.");
});
