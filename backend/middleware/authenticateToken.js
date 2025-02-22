import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    try { 
        const token = req.headers['authorization']?.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ message: "User is not auth." });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or Expired token." });
            }
    
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Error in authenticateToken:", error);
        return res.status(500).json({ message: "An error occurred while verifying the token." });
    }
};

export default authenticateToken;