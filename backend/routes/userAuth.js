import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    // Log the user ID in the token for debugging
    jwt.verify(token, "qbooks1303", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token expired or invalid. Please sign in again" });
        }
        console.log("Decoded user:", user); // Should log { id: ..., role: ... }
        req.user = user;
        next();
    });
};

export default authenticateToken;
