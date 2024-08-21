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

        // Set default values for required fields not provided by the image upload
        const defaultTeam = 'Default Team';
        const defaultOpponent = 'Default Opponent';
        const defaultAmount = 100;  // You can adjust this as needed
        const defaultOdds = '+100';  // You can adjust this as needed
        const defaultBetType = 'Moneyline';  // Adjust to a common bet type
        const defaultTicketCost = 10;  // Adjust this value as needed
        const defaultPayout = 200;  // Adjust this value as needed

        // Create a new ticket in the database
        const newTicket = await Bet.create({
            team: defaultTeam,
            opponent: defaultOpponent,
            amount: defaultAmount,
            odds: defaultOdds,
            description,  // The image URL stored in the description field
            date: new Date(),
            result,  // Win/Loss/Pending
            betType: defaultBetType,
            ticketCost: defaultTicketCost,
            payout: defaultPayout,
        });

        return res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
