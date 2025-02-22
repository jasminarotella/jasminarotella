const mongoose = require("mongoose");

const offerteLavoroSchema = new mongoose.Schema({
    titolo: { 
        type: String, 
        required: [true, "Il titolo è obbligatorio"], 
        minlength: [3, "Il titolo deve avere almeno 3 caratteri"], 
        maxlength: [100, "Il titolo non può superare i 100 caratteri"] 
    },
    descrizioneBreve: { 
        type: String, 
        required: [true, "La descrizione è obbligatoria"], 
        minlength: [10, "La descrizione deve avere almeno 10 caratteri"], 
        maxlength: [500, "La descrizione non può superare i 500 caratteri"] 
    },
    azienda: { 
        type: String, 
        required: [true, "Il nome dell'azienda è obbligatorio"] 
    },
    provincia: { 
        type: String, 
        required: [true, "La provincia è obbligatoria"], 
        minlength: [2, "La provincia deve avere almeno 2 caratteri"], 
        maxlength: [50, "La provincia non può superare i 50 caratteri"] 
    },
    dataInserimento: { 
        type: Date, 
        default: Date.now 
    },
    smartWorking: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    retribuzioneLorda: { 
        type: Number, 
        required: [true, "La retribuzione è obbligatoria"], 
        min: [1000, "La retribuzione deve essere almeno di 1000€"], 
        max: [200000, "La retribuzione non può superare i 200000€"] 
    },
    tipologiaContratto: { 
        type: String, 
        enum: ["Full time", "Part time", "Stage", "Tempo Determinato", "Tempo Indeterminato"], 
        required: [true, "Il tipo di contratto è obbligatorio"] 
    },
    benefits: { 
        type: [String], 
        default: [] 
    }
});

module.exports = mongoose.model("OfferteLavoro", offerteLavoroSchema);
