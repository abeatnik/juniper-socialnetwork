import bcrypt from "bcryptjs";
const spicedPg = require("spiced-pg");
import { QueryResult } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const db = spicedPg(DATABASE_URL);
import { DBTypes } from "./db-types";
import { RegistrationTypes } from "../client/src/components/Registration/registration-types";

const insertUser = (
    user: RegistrationTypes.NewUser
): ((password: string) => (arg0: QueryResult) => QueryResult) => {
    const sql = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    return db
        .hashPassword(user.password)
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

export { insertUser, hashPassword };
