import bcrypt from "bcrypt"
import { sql } from "../config/db.js";

export const login = async (req, res) =>{
    const { username, password } = req.body;

};
export const register = async (req, res) =>{
    try {
        const { username, password } = req.body;
        
        const existing = await sql`
            SELECT * FROM users WHERE username = ${username}
        `

        //if the user exists throw an error.
        if(existing.rowCount > 0){
            return res.status(400).json({error: 'Username is already in use'});
        }

        //else hash the password then create the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert into database
        const result = await sql`
            INSERT INTO users (username, password) VALUES(${username}, ${hashedPassword}) RETURNING id, username
        `;

        //Respond with user info
        return res.status(201).json({
            id: result.row[0].id,
            username: result.row[0].username,
        });


    } catch (error) {
        console.log("Error registering user", error);
    }

};