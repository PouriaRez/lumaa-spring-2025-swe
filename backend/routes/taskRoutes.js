import express from "express";
import { createTask, updateTask, retrieveTasks, deleteTask } from "../controllers/taskController.js"
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Create a task
router.post("/", authenticateToken ,createTask);     
// Update a task
router.put("/:id", authenticateToken, updateTask);
// Retrieve Tasks
router.get("/", authenticateToken, retrieveTasks);
// Delete Task
router.delete("/:id", authenticateToken, deleteTask);

export default router;