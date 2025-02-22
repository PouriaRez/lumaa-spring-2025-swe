import pool from '../config/db.js'

// id SERIAL PRIMARY KEY,
// title VARCHAR(255) NOT NULL,
// description VARCHAR(255),
// isComplete BOOLEAN NOT NULL DEFAULT FALSE,
// userID INT,
// createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

export const createTask = async (req, res) =>{
    const { title, description } = req.body;

    if(!title){
        res.status(400).json({ message: "You must enter a title for the task!" });
    }

    // Insert new task into database
    const result = await pool.query(
        `
        INSERT INTO tasks (title, description) VALUES ($1, $2) 
        RETURNING title, description
        `,
        [title, description]
    );


    // Respond with the tasks data.
    const newTask = result.rows[0];
    res.status(201).json(newTask);  

};