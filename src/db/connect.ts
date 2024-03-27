import mysql from "mysql2/promise";
import { env } from "../config/environment";

let db: null | mysql.Connection = null;

export async function connect() {
  if (db) return db;
  db = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password:env.DB_PASSWORD,
    database: env.DB_NAME,
  });
  return db
}
