import pool from '../config/db.js'

export const createTask = async (req, res) =>{

    try {
        const { title, description } = req.body;
        // returns the userID connected with the user logged in.
        const userID = req.user.userID;    
        
        if(!title){
            return res.status(400).json({ message: "You must enter a title for the task!" });
        }
    
        // Insert new task into database
        const result = await pool.query(
            `
            INSERT INTO tasks (title, description, userid) VALUES ($1, $2, $3) 
            RETURNING title, description, iscomplete
            `,
            [title, description, userID]
        );
    
        // Respond with the tasks data.
        const newTask = result.rows[0];
        res.status(201).json(newTask);  

    } catch (error) {
        console.error("Error Creating Task: ", error);     
        return res.status(500).json({ message: "Error creating task" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, iscomplete} = req.body;
        const userid = req.user.userID;

        if (!title || iscomplete === undefined) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const updateTodo = await pool.query(
            `
                UPDATE tasks 
                SET title = $1, description = $2, iscomplete = $3
                WHERE id = $4 AND userid = $5
                RETURNING *
            `, [ title, description, iscomplete, id, userid ]
        );

        if(updateTodo.rowCount === 0){
            return res.status(404).json({ error: "Task not found" });
        }

        // Access the updated task data
        const updatedTask = updateTodo.rows[0];
        return res.json(updatedTask);  

    } catch (error) {
        console.error("Error Updating Task: ", error);     
        return res.status(500).json({ message: "Error updating task" });

    }
};

export const retrieveTasks = async (req, res) =>{
    try {
        const userID = req.user.userID;

        const retrievedTasks = await pool.query(
            `
                SELECT * FROM tasks WHERE userid = $1 ORDER BY createdat ASC
            `, 
            [ userID ]
        );


        if(retrieveTasks.rowCount === 0){
            return res.status(404).json({ error: "No tasks were found!" });
        }


        const tasks = retrievedTasks.rows;
        return res.json(tasks);  

    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return res.status(500).json({ message: "An error occurred while retrieving tasks." });
    }
};

export const deleteTask = async (req, res) =>{

    try {
        const { id } = req.params;
        const userID = req.user.userID;

        const deletedTask = await pool.query(
            `
                SELECT * FROM tasks WHERE id = $1 AND userid = $2
            `,
            [ id, userID]
        );

        // Task not found
        if(deletedTask.rowCount === 0){
            return res.status(404).json({ error: "Tasks not found!" });
        }

        console.log("Deleting task: ", deleteTask.rows);
        // Delete task if found
        await pool.query(
            `
                DELETE FROM tasks where id = $1 AND userid = $2
            `,
            [ id, userID]
        );
        return res.json({ message: "Task deleted!" });
        
    } catch (error) {
        console.error("Error deleting task: ", error);
        return res.status(500).json({ message: "An error occurred while deleting task." })
    }
};