import { Request, Response } from 'express';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../config/keys';
import { generateToken } from '../utils/tokenHelper'; // Assuming this helper generates JWT tokens

export const login = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
    const [username, password] = decodedCredentials.split(':');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = generateToken(username); // Generate token using your helper
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
};
