// authMiddleware.ts - Refactored for Use in Routes
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/keys';

// Middleware function to verify the admin token
export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization token is missing or malformed.' });
        }

        const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the decoded token to the request for future use
        req.body.admin = decoded;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired. Please log in again.' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }
        return res.status(500).json({ error: 'Internal server error during token verification.' });
    }
};
