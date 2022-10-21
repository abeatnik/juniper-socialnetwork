import express from "express";
const app = express();
import compression from "compression";
import path from "path";
// import cookieSession from "cookie-session";
import Helmet from "helmet";
import * as dotenv from "dotenv";

dotenv.config();
app.use(compression());
app.use(express.urlencoded({ extended: false }));
// app.use(
//     cookieSession({
//         secret: process.env.SESSION_SECRET,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//         sameSite: true,
//     })
// );
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

app.use(express.static(path.join(__dirname, "..", "client", "public")));

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
