import bcrypt from "bcryptjs";
const spicedPg = require("spiced-pg");
import { QueryResult } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const db = spicedPg(DATABASE_URL);
import { DBTypes } from "./db-types";
import { RegistrationTypes } from "../client/src/components/Registration/registration-types";

export const insertUser = (user: RegistrationTypes.NewUser) => {
    const sql = `
    INSERT INTO users (first_name, last_name, email, password)
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

const hashPassword = (password: string) => {
    return bcrypt.genSalt().then((salt: string) => bcrypt.hash(password, salt));
};

export const getUserByEmail = (email: string): Promise<QueryResult> => {
    const sql = `
    SELECT password, users.id AS user_id, signatures.id AS signature_id FROM users LEFT JOIN signatures ON users.id=signatures.user_id WHERE users.email = $1;
    `;
    return db.query(sql, [email]);
};

export const getUserInfo = (userId: string) => {
    const sql = `SELECT last_name AS lastname, first_name AS firstname, email, age, city, url FROM users JOIN user_profiles ON users.id=user_profiles.user_id WHERE users.id=$1;`;
    return db.query(sql, [userId]);
};

export const authenticateUser = (hash: string, password: string) => {
    return bcrypt.compare(password, hash);
};
