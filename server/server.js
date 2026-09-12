import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import taskRoutes from "./routes/route.task.js";


const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.use("/api/tasks", taskRoutes);

app.listen(8000, () => {
    console.log("Server is running on Port: 8000");
});