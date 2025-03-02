import mongoose from "mongoose";

// Modello Task
const TaskSchema = new mongoose.Schema({
    id: Number,
    programmata: Boolean,
    data: String,
    text: String,
    done: Boolean,
});

// Modello Calendario
const CalendarioSchema = new mongoose.Schema({
    data: String, // es: '2025-03-02'
    taskProgrammate: [TaskSchema],
    taskGiornaliere: [TaskSchema],
    archiviate: [TaskSchema],
});

const Calendario = mongoose.model("Calendario", CalendarioSchema);

export default Calendario;
