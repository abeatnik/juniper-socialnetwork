import express from "express";
const app = express();
import compression from "compression";
import path from "path";
import cookieSession from "cookie-session";
import Helmet from "helmet";
import * as db from "./db";
import * as dotenv from "dotenv";
import cryptoRandomString from "crypto-random-string";

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
app.use(
    Helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "script-src": [
                    "'self'",
                    "https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js",
                ],
                "style-src": null,
            },
        },
    })
);

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
            db.authenticateUser(entry.rows[0].password, req.body.password).then(
                (authenticated) => {
                    if (authenticated) {
                        res.json({ success: true });
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
                .cath((err: Error) => console.log(err));
        } else {
            res.json({ success: false });
        }
    });
});

app.post("/reset2", (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
    db.checkVerificationCode(email).then((entry) => {
        if (entry.rows[0].code) {
            const trueCode = entry.rows[0].code;
            if (trueCode === verificationCode) {
                db.hashPassword(newPassword)
                    .then((newHash) => {
                        db.updateUserPassword(email, newHash)
                            .then(() => {
                                db.deleteVerificationCode(verificationCode);
                                res.json({ success: true });
                            })
                            .catch(() => res.json({ success: false }));
                    })
                    .catch(() => res.json({ success: false }));
            }
        } else {
        }
    });
});

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.get("*", function (req, res): void {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function (): void {
    console.log("I'm listening.");
});
