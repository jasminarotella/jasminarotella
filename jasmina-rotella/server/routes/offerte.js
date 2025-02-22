const express = require('express');
const OfferteLavoro = require('../models/OfferteLavoro');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ API di ricerca (PRIMA di `/:id` per evitare conflitti)
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim() === "") {
            return res.status(400).json({ error: "Devi specificare un testo di ricerca" });
        }

        // Cerca il testo nel titolo, nella descrizione o nella provincia
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

// ✅ Creare un'offerta (protetta con autenticazione) (, authMiddleware)
router.post('/', async (req, res) => {
    try {
        const nuovaOfferta = new OfferteLavoro(req.body);
        await nuovaOfferta.save();
        res.json({ message: "Offerta aggiunta con successo!", offerta: nuovaOfferta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// ✅ Ottenere tutte le offerte
router.get('/', async (req, res) => {
    try {
        const offerte = await OfferteLavoro.find().sort({ dataInserimento: -1 });
        res.json(offerte);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Ottenere un'offerta per ID (DEVE essere dopo `/search`)
router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "ID non valido" });
        }

        const offerta = await OfferteLavoro.findById(req.params.id);
        if (!offerta) return res.status(404).json({ error: "Offerta non trovata" });
        res.json(offerta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Modificare offerta per ID
router.put('/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "ID non valido" });
        }

        const offertaAggiornata = await OfferteLavoro.findByIdAndUpdate(
            req.params.id,
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

// ✅ Eliminare offerta per ID
router.delete('/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "ID non valido" });
        }

        const offerta = await OfferteLavoro.findByIdAndDelete(req.params.id);
        if (!offerta) return res.status(404).json({ error: "Offerta non trovata" });
        res.json({ message: "Offerta eliminata con successo!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
