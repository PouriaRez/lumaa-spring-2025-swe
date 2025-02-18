import { neon } from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

// Creates SQL connection
// allows us to query sql
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

//initializes the Database
export async function initDB(){
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255)  NOT NULL
        )
        `
        
        console.log("DB init success!");
    } catch (error) {
        console.log("Error initDB", error);
    }
}

