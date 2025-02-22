const mongoose = require('mongoose');

const offerteLavoroSchema = new mongoose.Schema({
    titolo: { type: String, required: true },
    descrizioneBreve: { type: String, required: true },
    azienda: { type: String, required: true },
    provincia: { type: String, required: true },
    dataInserimento: { type: Date, default: Date.now },
    smartWorking: { type: Boolean, required: true },
    retribuzioneLorda: { type: Number, required: true },
    tipologiaContratto: { type: String, enum: ['Full time', 'Part time', 'Stage', 'Tempo Determinato', 'Tempo Indeterminato'], required: true }
});

module.exports = mongoose.model('OfferteLavoro', offerteLavoroSchema);
