import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import  connectDB  from './config/db.js'; // Assicurati che db.js usi ES Module
import authRoutes from './routes/auth.js'; 
import offerteRoutes from './routes/offerte.js';

dotenv.config(); // Carica le variabili d'ambiente

const app = express();
const PORT = process.env.PORT || 5001;

connectDB(); // Connessione al database

app.use(cors());
app.use(express.json());

// Importa le route
app.use('/auth', authRoutes);
app.use('/offerte', offerteRoutes);

// Avvia il server
app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});
