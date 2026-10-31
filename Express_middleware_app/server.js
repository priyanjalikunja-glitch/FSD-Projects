import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

const app = express();
const PORT = 6500;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middleware
const logger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const period = Date.now() - start;

        const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${period}ms\n`;

        fs.appendFile('server.log', log, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });

    next();
};

app.use(logger);

// Validation Middleware
const validate = (req, res, next) => {
    const { name, gender, ward } = req.body;

    if (!name || !gender || !ward) {
        const error = new Error('Patient details missing');
        error.statusCode = 400;
        return next(error);
    }

    next();
};

// POST - Create Patient
app.post('/api/v1/patients', validate, (req, res) => {
    res.status(200).json({
        message: 'Patient created successfully'
    });
});

// GET - All Patients
app.get('/api/v1/patients', (req, res) => {
    const ward = req.query.ward;

    if (ward) {
        res.status(200).json({
            message: `Patients in ward ${ward} fetched successfully`
        });
    } else {
        res.status(200).json({
            message: 'All patients fetched successfully'
        });
    }
});

// GET - Patient by ID
app.get('/api/v1/patients/:id', (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        message: `Patient with ID ${id} fetched successfully`
    });
});

// PUT - Update Patient
app.put('/api/v1/patients/:id', (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        message: `Patient with ID ${id} updated successfully`
    });
});

// DELETE - Delete Patient
app.delete('/api/v1/patients/:id', (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        message: `Patient with ID ${id} deleted successfully`
    });
});

// 404 Middleware
app.use((req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).send(message);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});