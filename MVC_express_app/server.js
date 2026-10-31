import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieroutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/api/v1/movies", movieRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});