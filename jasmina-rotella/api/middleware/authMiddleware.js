import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || "supersegreto";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Accesso negato" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token non valido" });
    }
};

module.exports = authMiddleware;
