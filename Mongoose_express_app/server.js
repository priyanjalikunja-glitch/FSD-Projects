import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// MongoDB connection
mongoose
    .connect(mongoURI, {
        dbName: dbName
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Problem while connecting to MongoDB:", err);
    });

// Movie Schema
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

// Movie Model
const Movie = mongoose.model("Movie", MovieSchema);

const app = express();

app.use(express.json());

// POST - Create Movie
app.post("/api/v1/movies", (req, res) => {
    const newMovie = req.body;

    Movie.create(newMovie)
        .then((result) => {
            res.status(201).json({
                message: "Movie created successfully",
                data: result
            });
        })
        .catch((err) => {
            console.error("Movie creation failed:", err);
        });
});

// GET - Get All Movies
app.get("/api/v1/movies", (req, res) => {
    const { category } = req.query;

    const query = category ? { category } : {};

    Movie.find(query)
        .then((result) => {
            res.status(200).json({
                message: "Movies fetched successfully",
                data: result
            });
        })
        .catch((err) => {
            console.error("Movie fetching failed:", err);
        });
});

// GET - Get Movie by ID
app.get("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;

    Movie.findById(id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Movie fetched successfully",
                    data: result
                });
            } else {
                res.status(404).json({
                    message: "Movie not found"
                });
            }
        })
        .catch((err) => {
            console.error("Movie fetching failed:", err);
        });
});

// PUT - Update Movie
app.put("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    const updatedMovie = req.body;

    Movie.findByIdAndUpdate(id, updatedMovie, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Movie updated successfully",
                    data: result
                });
            } else {
                res.status(404).json({
                    message: "Movie not found"
                });
            }
        })
        .catch((err) => {
            console.error("Movie update failed:", err);
        });
});

// DELETE - Delete Movie
app.delete("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Movie deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Movie not found"
                });
            }
        })
        .catch((err) => {
            console.error("Movie deletion failed:", err);
        });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})