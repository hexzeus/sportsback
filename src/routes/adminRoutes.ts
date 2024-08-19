// adminRoutes.ts - Updated
import { Router } from 'express';
import { login } from '../controllers/adminController'; // Admin login controller

const router = Router();

// Admin login route - No need for verifyAdmin here
router.post('/login', login);

// Additional admin-specific routes can go here

export default router;
