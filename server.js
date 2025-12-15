import express from 'express';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Datu-basea konektatu eta zerbitzaria abiarazi
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// Middleware eta routes hemen gehitu
app.use(express.json());