import mongoose from "mongoose";

const OfferteSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    titolo: { type: String, required: true },
    descrizioneBreve: { type: String, required: true },
    azienda: { type: String, required: true },
    provincia: { type: String, required: true },
    smartWorking: { type: Boolean, required: true },
    retribuzioneLorda: { type: Number, required: true },
    tipologiaContratto: { type: String, required: true },
    dataInserimento: { type: Date, default: Date.now },
});

const OfferteLavoro = mongoose.model("OfferteLavoro", OfferteSchema);
export default OfferteLavoro;
