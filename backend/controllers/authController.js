import bcrypt from "bcrypt"
import pool from '../config/db.js'
import jwt from "jsonwebtoken"

export const login = async (req, res) =>{
    try {
        const { username, password } = req.body;
    
        // Find / look for user
        const user = await pool.query(
            `
                SELECT * FROM users WHERE username = $1
            `,
            [username]
        );
    
        // grabs the users info.
        const userInfo = user.rows[0];
        console.log(userInfo);
    
        // if no username found
        if(user.rowCount == 0){
            return res.status(400).json({message: "Invalid username or password"})
        }
    
        const passCheck = await bcrypt.compare(password, userInfo.password);
        
        if(!passCheck){
            return res.status(400).json({message: "Invalid username or password"});
        }
    
        console.log(userInfo.username);
        // Generate token
        const token = jwt.sign(
            { // payload
            userID: userInfo.id,
            username: userInfo.username,
            },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );
    
        return res.json({token});
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred during login." });
    }
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
        if(existanceCheck.rowCount || existanceCheck.rowCount > 0 ){
            return res.status(400).json({error: 'Username is already in use'});
        }

        //else hash the password then create the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert into database
          const result = await pool.query(
            'INSERT INTO users (username, password) VALUES($1, $2) RETURNING id, username',
            [username, hashedPassword] 
          );
          
          // Respond with the new user's data
          const newUser = result.rows[0];
          res.status(201).json(newUser);  

    } catch (error) {
        console.error("Error registering user", error);
        return res.status(500).json({ message: "An error occurred during registration." });
    }

};