import { Request, Response } from 'express';
import Bet from '../models/bet';

// POST - Create a new bet
export const postBet = async (req: Request, res: Response) => {
    try {
        const { team, opponent, amount, odds, description, date, result, betType, ticketCost, payout } = req.body;

        // Ensure all required fields are provided
        if (!team || !opponent || !amount || !odds || !date || !result || !betType || !ticketCost || !payout) {
            return res.status(400).json({ error: 'All fields are required, including betType, opponent, ticketCost, and payout.' });
        }

        // Create a new bet entry in the database
        const newBet = await Bet.create({
            team,
            opponent,
            amount,
            odds: odds.toString(),  // Ensure odds are stored as a string
            description,
            date: new Date(date),
            result,
            betType,
            ticketCost,
            payout
        });

        return res.status(201).json({ message: 'Bet posted successfully', bet: newBet });
    } catch (error) {
        console.error('Error posting bet:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT - Update an existing bet
export const updateBet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { team, opponent, amount, odds, description, date, result, betType, ticketCost, payout } = req.body;

        // Find the bet by its ID
        const bet = await Bet.findByPk(id);
        if (!bet) {
            return res.status(404).json({ error: 'Bet not found' });
        }

        // Update the bet with the provided values, keeping existing values if not provided
        bet.team = team !== undefined ? team : bet.team;
        bet.opponent = opponent !== undefined ? opponent : bet.opponent;
        bet.amount = amount !== undefined ? amount : bet.amount;
        bet.odds = odds !== undefined ? odds.toString() : bet.odds;  // Ensure odds are updated as a string
        bet.description = description !== undefined ? description : bet.description;
        bet.date = date !== undefined ? new Date(date) : bet.date;
        bet.result = result !== undefined ? result : bet.result;
        bet.betType = betType !== undefined ? betType : bet.betType;
        bet.ticketCost = ticketCost !== undefined ? ticketCost : bet.ticketCost;
        bet.payout = payout !== undefined ? payout : bet.payout;

        // Save the updated bet
        await bet.save();

        return res.status(200).json({ message: 'Bet updated successfully', bet });
    } catch (error) {
        console.error('Error updating bet:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE - Delete a bet
export const deleteBet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find the bet by ID
        const bet = await Bet.findByPk(id);
        if (!bet) {
            return res.status(404).json({ error: 'Bet not found' });
        }

        // Delete the bet
        await bet.destroy();
        return res.status(200).json({ message: 'Bet deleted successfully' });
    } catch (error) {
        console.error('Error deleting bet:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// GET - Fetch all bets
export const getAllBets = async (req: Request, res: Response) => {
    try {
        // Fetch all bets from the database
        const bets = await Bet.findAll();
        return res.status(200).json(bets);
    } catch (error) {
        console.error('Error fetching bets:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// GET - Fetch a single bet by ID
export const getBetById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find the bet by ID
        const bet = await Bet.findByPk(id);
        if (!bet) {
            return res.status(404).json({ error: 'Bet not found' });
        }

        return res.status(200).json(bet);
    } catch (error) {
        console.error('Error fetching bet:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
