import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes  from "./routes/authRoutes.js"
import taskRoutes  from "./routes/taskRoutes.js"
import { initDB } from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);


initDB().then(() =>{
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    })
})
