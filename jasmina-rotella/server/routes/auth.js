import express from "express";
import User from "../models/User.js"; // Importa il modello User

const router = express.Router();

// ✅ Route per aggiungere un utente (POST)
router.post("/users", async (req, res) => {
  try {
    const { nomeutente, email, password } = req.body;

    if (!nomeutente || !password) {
      return res.status(400).json({ error: "Nome utente e password sono obbligatori" });
    }

    const nuovoUtente = new User({ nomeutente, email, password });
    await nuovoUtente.save();

    res.status(201).json({ message: "Utente inserito!", id: nuovoUtente._id });
  } catch (err) {
    res.status(500).json({ error: "Errore durante l'inserimento" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Errore durante il recupero utenti" });
  }
});

export default router;
