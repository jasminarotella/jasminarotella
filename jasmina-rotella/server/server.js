require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = "supersegreto"; // Meglio salvarlo in .env

// Middleware
app.use(cors());
app.use(express.json()); // Per leggere i JSON

// Connetti MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connesso'))
    .catch(err => console.error('❌ Errore MongoDB:', err));

// Modello User
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

// ✅ API di esempio (Home)
app.get('/', (req, res) => {
    res.send('Benvenuto nel backend!');
});

// ✅ API per aggiungere un utente (senza login)
app.post('/add-user', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Controllo se l'utente esiste già
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email già registrata" });

        // Cripta la password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea il nuovo utente
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "Utente salvato nel database!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ API di registrazione (Signup)
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Controllo se l'utente esiste già
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email già registrata" });

        // Cripta la password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea il nuovo utente
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "Registrazione avvenuta con successo!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ API di login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Trova l'utente nel database
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Email non registrata" });

        // Confronta la password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Password errata" });

        // Genera un token JWT
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login riuscito!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ API per ottenere la lista di tutti gli utenti (solo per test)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Non mostrare la password
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Middleware di autenticazione con JWT
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Accesso negato" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token non valido" });
    }
};

// ✅ API protetta per ottenere il profilo utente
app.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Avvia il server
app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});
