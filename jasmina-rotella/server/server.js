import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import authRoutes from './routes/auth.js'; 
import offerteRoutes from './routes/offerte.js';
import calendarioRoutes from './routes/calendario.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://jasminarotella.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// ✅ Importa la route utenti
app.use('/auth', authRoutes);
app.use('/offerte', offerteRoutes);
app.use('/calendario', calendarioRoutes); 

app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});


