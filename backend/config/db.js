import dotenv from "dotenv"
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT} = process.env;

// Creates SQL connection
// allows us to query sql
const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: PORT || 5432,
    ssl: {
      require: true,
    },
  });

//initializes the Database
export async function initDB(){
    try {
       await  pool.connect();

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255)  NOT NULL
            )
            `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255),
                isComplete BOOLEAN NOT NULL DEFAULT FALSE,
                userID INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )  
            `);
        
         console.log("DB init success!");
    } catch (error) {
        console.log("Error InitDB", error);
    }
}


export default pool;