import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/keys';

export const generateToken = (username: string) => {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
};
