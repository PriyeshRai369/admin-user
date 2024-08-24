import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';

async function authenticateToken(req, res, next) {
    try {
        const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ success: false, message: "No token found. Login first." });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await User.findById(decoded.id).select("-password"); 
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Unauthorize identity login first." });
    }
}


function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({success:false,message:"unauthorize identity, you are not authorize to access this page."});
        next();
    };
}

export { authenticateToken, authorizeRole }