import express from "express";
import Calendario from "../models/Calendar.js"; // Assicurati di avere il modello

const router = express.Router();

// 📌 Ottieni i task di un determinato giorno
router.get("/:date", async (req, res) => {
    try {
        const giorno = await Calendario.findOne({ data: req.params.date });
        if (!giorno) return res.status(404).json({ message: "Nessun task per questa data" });
        res.json(giorno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Aggiungi un nuovo task a una data specifica
router.post("/", async (req, res) => {
    try {
        const { data, task } = req.body;
        let giorno = await Calendario.findOne({ data });

        if (!giorno) {
            giorno = new Calendario({
                data,
                taskProgrammate: [task],
                taskGiornaliere: [],
                archiviate: [],
            });
        } else {
            giorno.taskProgrammate.push(task);
        }

        await giorno.save();
        res.status(201).json(giorno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
