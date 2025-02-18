import express from "express";
import { login, register } from "../controllers/authController.js"
const router = express.Router();

router.post("/login", (req, res) =>{
    res.send("Login successful");  // Example response

});
router.post("/register", register);

export default router;