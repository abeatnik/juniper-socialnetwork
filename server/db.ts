import bcrypt from "bcryptjs";
const spicedPg = require("spiced-pg");
import { QueryResult } from "pg";
const DATABASE_URL = process.env.DATABASE_URL;
const db = spicedPg(DATABASE_URL);
import * as dotenv from "dotenv";
import { Interface } from "readline";
dotenv.config();

interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    userId?: string;
}

// module.exports.insertUser = (
//     user: User
// ): ((password: string) => QueryResults<>) => {
//     const sql = `
//     INSERT INTO users (first_name, last_name, email, password)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *;
//     `;

//     return db
//         .hashPassword(user.password)
//         .then((hash: string) => {
//             return db.query(sql, [
//                 user.firstname,
//                 user.lastname,
//                 user.email,
//                 hash,
//             ]);
//         })
//         .catch((err: Error) => console.log(err));
// };

// module.exports.hashPassword = (password: string) => {
//     return bcrypt.genSalt().then((salt: string) => bcrypt.hash(password, salt));
// };
