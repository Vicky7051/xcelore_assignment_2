import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SEC_KEY = process.env.JWT_SECRITE

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({status : false, message : "Unauthorized: Missing or invalid token."})
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = JWT.verify(token, JWT_SEC_KEY);
        req.user = decoded;
    
        if (req.user.isAdmin !== true) {
          return res.status(403).json({status : false, message : "Forbidden: Admin access required."})
        }
        next();
    }
    catch(error) {
        return res.status(403).json({status : false, message : "Forbidden: Invalid token"})
    }
}