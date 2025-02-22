import express from "express";
import { createTask } from "../controllers/taskController.js"
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/", authenticateToken ,createTask);     


export default router;