
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

app.use(express.json());

const url = "mongodb://localhost:27017";
const dbName = "booksDB";

const client = new MongoClient(url);

let db;


// CREATE BOOK - POST
app.post("/api/v1/books", (req, res) => {

    const newBook = req.body;

    db.collection("books").insertOne(newBook)
        .then((result) => {

            res.status(201).json({
                message: "Book created successfully",
                data: {
                    _id: result.insertedId,
                    ...newBook
                }
            });

        })
        .catch((err) => {

            res.status(500).json({
                message: "Failed to create book",
                error: err.message
            });

        });
});


// READ ALL BOOKS / BY CATEGORY - GET
app.get("/api/v1/books", (req, res) => {

    const { category } = req.query;

    const query = category
        ? { category: category }
        : {};

    db.collection("books").find(query).toArray()
        .then((result) => {

            res.status(200).json({
                message: "Books retrieved successfully",
                data: result
            });

        })
        .catch((err) => {

            res.status(500).json({
                message: "Failed to retrieve books",
                error: err.message
            });

        });
});


// READ BOOK BY ID - GET
app.get("/api/v1/books/:id", (req, res) => {

    const { id } = req.params;

    db.collection("books").findOne({
        _id: new ObjectId(id)
    })
        .then((result) => {

            if (result) {

                res.status(200).json({
                    message: "Book retrieved successfully",
                    data: result
                });

            } else {

                res.status(404).json({
                    message: "Book not found"
                });

            }

        })
        .catch((err) => {

            res.status(500).json({
                message: "Failed to retrieve book",
                error: err.message
            });

        });
});


// UPDATE BOOK BY ID - PUT
app.put("/api/v1/books/:id", (req, res) => {

    const { id } = req.params;

    const updatedBook = req.body;

    db.collection("books").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedBook }
    )
        .then((result) => {

            if (result.matchedCount === 1) {

                res.status(200).json({
                    message: "Book updated successfully",
                    data: {
                        _id: new ObjectId(id),
                        ...updatedBook
                    }
                });

            } else {

                res.status(404).json({
                    message: "Book not found"
                });

            }

        })
        .catch((err) => {

            res.status(500).json({
                message: "Failed to update book",
                error: err.message
            });

        });
});


// DELETE BOOK BY ID - DELETE
app.delete("/api/v1/books/:id", (req, res) => {

    const { id } = req.params;

    db.collection("books").deleteOne({
        _id: new ObjectId(id)
    })
        .then((result) => {

            if (result.deletedCount === 1) {

                res.status(200).json({
                    message: "Book deleted successfully",
                    data: {
                        _id: new ObjectId(id)
                    }
                });

            } else {

                res.status(404).json({
                    message: "Book not found"
                });

            }

        })
        .catch((err) => {

            res.status(500).json({
                message: "Failed to delete book",
                error: err.message
            });

        });
});


// 404 Middleware
app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});


// Error Handling Middleware
app.use((err, req, res, next) => {

    const status = err.status || 500;

    const message = err.message || "Internal server error";

    res.status(status).json({
        message: message
    });

});


// Connect to MongoDB and Start Server
const PORT = 7000;

client.connect()
    .then(() => {

        console.log("Connected to MongoDB");

        db = client.db(dbName);

        app.listen(PORT, () => {

            console.log(`Server is running on http://localhost:${PORT}`);

        });

    })
    .catch((err) => {

        console.log("Problem in connecting MongoDB:", err);

    });