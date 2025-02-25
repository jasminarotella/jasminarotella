import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const OfferteSchema = new mongoose.Schema({
    titolo: { type: String, required: true },
    descrizioneBreve: { type: String, required: true },
    azienda: { type: String, required: true },
    provincia: { type: String, required: true },
    smartWorking: { type: Boolean, required: true },
    retribuzioneLorda: { type: Number, required: true },
    tipologiaContratto: { type: String, required: true },
    dataInserimento: { type: Date, default: Date.now },
});

// Applica il plugin per auto-incrementare il campo "id"
OfferteSchema.plugin(AutoIncrement, { inc_field: "id" });

const OfferteLavoro = mongoose.model("OfferteLavoro", OfferteSchema);
export default OfferteLavoro;
