import express from "express";
const app = express();
import compression from "compression";
import path from "path";

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res): void {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function (): void {
    console.log("I'm listening.");
});
