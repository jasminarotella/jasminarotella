import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import authRoutes from './routes/auth.js'; 
import offerteRoutes from './routes/offerte.js';
import calendarioRoutes from './routes/calendario.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());

// ✅ Importa la route utenti
app.use('/auth', authRoutes);
app.use('/offerte', offerteRoutes);
app.use('/calendario', calendarioRoutes); 

app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});


