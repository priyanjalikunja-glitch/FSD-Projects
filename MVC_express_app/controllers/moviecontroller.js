import Movie from "../models/moviemodels.js";

export const createMovie = (req, res) => {
    Movie.create(req.body)
        .then((result) => {
            res.status(201).json({
                message: "Movie created successfully",
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Movie creation failed",
                error: err.message
            });
        });
};

export const getMovies = (req, res) => {
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
            res.status(500).json({
                message: "Movies fetching failed",
                error: err.message
            });
        });
};

export const getMovieById = (req, res) => {
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
            res.status(500).json({
                message: "Movie fetching failed",
                error: err.message
            });
        });
};

export const updateMovie = (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndUpdate(id, req.body, { new: true })
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
            res.status(500).json({
                message: "Movie update failed",
                error: err.message
            });
        });
};

export const deleteMovie = (req, res) => {
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
            res.status(500).json({
                message: "Movie deletion failed",
                error: err.message
            });
        });
};