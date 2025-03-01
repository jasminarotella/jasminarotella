import express from 'express';
import mongoose from 'mongoose';
import OfferteLavoro from "../models/OfferteLavoro.js";

const router = express.Router();

// API di ricerca
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || query.trim() === "") {
            return res.status(400).json({ error: "Devi specificare un testo di ricerca" });
        }
        const offerte = await OfferteLavoro.find({
            $or: [
                { titolo: { $regex: new RegExp(query, "i") } },
                { descrizioneBreve: { $regex: new RegExp(query, "i") } },
                { provincia: { $regex: new RegExp(query, "i") } }
            ]
        }).sort({ dataInserimento: -1 });
        res.json(offerte);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/provinces", async (req, res) => {
    try {
        const provinces = await OfferteLavoro.distinct("provincia");
        res.json(provinces);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle province" });
    }
});

// Creare un'offerta
router.post('/', async (req, res) => {
    try {
        const nuovaOfferta = new OfferteLavoro(req.body);
        await nuovaOfferta.save();
        res.json({ message: "Offerta aggiunta con successo!", offerta: nuovaOfferta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ottenere tutte le offerte
router.get('/', async (req, res) => {
    try {
        const offerte = await OfferteLavoro.find().sort({ dataInserimento: -1 });
        res.json(offerte);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ottenere un'offerta per ID (se vuoi usare il campo auto-increment, usa findOne)
router.get('/:id', async (req, res) => {
    try {
        const offerta = await OfferteLavoro.findOne({ id: req.params.id });
        if (!offerta) return res.status(404).json({ error: "Offerta non trovata" });
        res.json(offerta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Modificare un'offerta per ID (usa il campo auto-increment "id")
router.put('/:id', async (req, res) => {
    try {
        const offertaAggiornata = await OfferteLavoro.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!offertaAggiornata) {
            return res.status(404).json({ error: "Offerta non trovata" });
        }
        res.json({ message: "Offerta aggiornata con successo!", offerta: offertaAggiornata });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminare un'offerta per ID (usa il campo auto-increment "id")
router.delete('/:id', async (req, res) => {
    try {
        const offerta = await OfferteLavoro.findOneAndDelete({ id: req.params.id });
        if (!offerta) return res.status(404).json({ error: "Offerta non trovata" });
        res.json({ message: "Offerta eliminata con successo!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
