import bcrypt from "bcryptjs";
const spicedPg = require("spiced-pg");
import { QueryResult } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const db = spicedPg(DATABASE_URL);
import { DBTypes } from "./db-types";
import { RegistrationTypes } from "../client/src/components/Welcome/Registration/registration-types";
import { stringMap } from "aws-sdk/clients/backup";

export const insertUser = (user: RegistrationTypes.NewUser) => {
    const sql = `
    INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    return hashPassword(user.password)
        .then((hash: string) => {
            return db.query(sql, [
                user.firstname,
                user.lastname,
                user.email,
                hash,
            ]);
        })
        .catch((err: Error) => console.log(err));
};

export const hashPassword = (password: string) => {
    return bcrypt.genSalt().then((salt: string) => bcrypt.hash(password, salt));
};

export const getUserByEmail = (email: string): Promise<QueryResult> => {
    const sql = `
    SELECT * FROM users WHERE email = $1;
    `;
    return db.query(sql, [email]);
};

export const getUserInfo = (userId: number) => {
    const sql = `SELECT lastname, firstname, email, url FROM users WHERE users.id=$1;`;
    return db.query(sql, [userId]);
};

export const authenticateUser = (hash: string, password: string) => {
    return bcrypt.compare(password, hash);
};

export const insertProfilePic = (url: string, userId: number) => {
    const sql = `UPDATE users SET url=$1 WHERE id=$2;`;
    return db.query(sql, [url, userId]);
};

export const storeVerificationCode = (email: string, code: string) => {
    const sql = `INSERT INTO verification_codes (user_email, code)
                VALUES ($1, $2)
                RETURNING *;`;
    return db.query(sql, [email, code]);
};

export const checkVerificationCode = (email: string) => {
    const sql = `SELECT * FROM verification_codes WHERE user_email=$1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY created_at DESC LIMIT 1;`;
    return db.query(sql, [email]);
};

export const updateUserPassword = (email: string, hash: string) => {
    const sql = `UPDATE users SET password=$2 WHERE email=$1;`;
    return db.query(sql, [email, hash]);
};
