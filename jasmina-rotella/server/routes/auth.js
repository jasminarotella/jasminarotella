const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "supersegreto";

// Registrazione
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email già registrata" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "Registrazione avvenuta con successo!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Email non registrata" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Password errata" });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login riuscito!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
