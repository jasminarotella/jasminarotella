require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

connectDB(); // Connessione al database

app.use(cors());
app.use(express.json());

// Importa le route
app.use('/auth', require('./routes/auth'));
app.use('/offerte', require('./routes/offerte'));

// Avvia il server
app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});
