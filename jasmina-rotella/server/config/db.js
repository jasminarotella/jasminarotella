const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connesso');
    } catch (error) {
        console.error('❌ Errore MongoDB:', error);
        process.exit(1); // Ferma l'app se c'è un errore
    }
};

module.exports = connectDB;
