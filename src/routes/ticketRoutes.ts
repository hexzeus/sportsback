import { Router } from 'express';
import { postTicket } from '../controllers/ticketController'; // New ticket controller
import { verifyAdminToken } from '../middlewares/authMiddleware';

const router = Router();

// Protected route for admin to create a ticket (with image)
router.post('/create-ticket', verifyAdminToken, postTicket);

export default router;
