import path from "path";
import fs from "fs";
import multer from "multer";
import uidSafe from "uid-safe";
import * as express from "express";
import aws from "aws-sdk";
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

export const uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});

export const s3Uploader = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { filename, mimetype, size, path } = req.file;
    const insertRemoteImage = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();
    insertRemoteImage.then(() => {
        fs.unlinkSync(path);
        next();
    });
};
