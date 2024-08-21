import { Request, Response } from 'express';
import Bet from '../models/bet';  // Assuming you're using the Bet model to handle tickets

// POST - Create a new ticket with image upload
export const postTicket = async (req: Request, res: Response) => {
    try {
        const { description, result } = req.body;

        // Validate required fields
        if (!description || !result) {
            return res.status(400).json({ error: 'Description (image URL) and result are required.' });
        }

        // Create a new ticket in the database
        const newTicket = await Bet.create({
            description,  // The image URL stored in the description field
            result,       // Win/Loss/Pending
            date: new Date(),
        });

        return res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
