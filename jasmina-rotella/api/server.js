import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import authRoutes from './routes/auth.js'; 
import offerteRoutes from './routes/offerte.js';
import serverless from 'serverless-http';

dotenv.config();
const app = express();

// Connessione al DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rotte con prefisso /api
app.use('/api/auth', authRoutes);
app.use('offerte', offerteRoutes);
app.use('/api/users', authRoutes); 

// Non usare app.listen() in ambiente serverless
// app.listen(PORT, () => console.log(...));

export default serverless(app);
