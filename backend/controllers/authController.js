import bcrypt, { hash } from "bcrypt"
import pool from '../config/db.js'

export const login = async (req, res) =>{
    const { username, password } = req.body;

};
export const register = async (req, res) =>{
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({message: 'Please enter a Username and Password'})
        }
        
        const existanceCheck = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        //if the user exists throw an error.
        if(existanceCheck.rowCount > 0){
            return res.status(400).json({error: 'Username is already in use'});
        }

        //else hash the password then create the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("Inserting user with values:", [username, hashedPassword]);


        // Insert into database
          const result = await pool.query(
            'INSERT INTO users (username, password) VALUES($1, $2) RETURNING id, username',
            [username, hashedPassword] 
          );
          
          // Respond with the new user's data
          const newUser = result.rows[0];
          res.status(201).json(newUser);  

    } catch (error) {
        console.log("Error registering user", error);
    }

};