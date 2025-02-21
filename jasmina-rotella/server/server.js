require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Per leggere i JSON

// Connetti MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connesso'))
  .catch(err => console.error(err));

// API di esempio
app.get('/', (req, res) => {
    res.send('Hello from Node.js Backend!');
});
//APi post di esempio
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    age: Number
}));

app.post('/add-user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: "Utente salvato nel database!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
