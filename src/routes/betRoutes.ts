// routes/betRoutes.ts
import { Router } from 'express';
import { postBet, updateBet, deleteBet, getAllBets } from '../controllers/betController';
import { verifyAdminToken } from '../middlewares/authMiddleware';

const router = Router();

// Public route to get all bets
router.get('/', getAllBets);

// Protected routes for admin actions
router.post('/', verifyAdminToken, postBet); // Admins create bets
router.put('/:id', verifyAdminToken, updateBet); // Admins update bets
router.delete('/:id', verifyAdminToken, deleteBet); // Admins delete bets

export default router;
