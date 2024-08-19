import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import adminRoutes from './routes/adminRoutes'; // Admin routes
import betRoutes from './routes/betRoutes'; // Bet routes
import { errorHandler } from './middlewares/errorHandler'; // Error handling middleware

const app = express();

// Apply Helmet with secure CSP
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", "https://sportsback.onrender.com", "http://localhost:3000"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                imgSrc: ["'self'", "data:"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                connectSrc: ["'self'", "https://sportsback.onrender.com", "http://localhost:3000"],
            },
        },
        crossOriginEmbedderPolicy: false,
    })
);

// Enable CORS
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Admin and bet routes
app.use('/api/admin', adminRoutes);
app.use('/api/bets', betRoutes);

// Health check route
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Root route
app.get('/', (req, res) => res.send('Welcome to the Betting API'));

// Error handling middleware
app.use(errorHandler);

// Catch-all route handler
app.use((req, res) => res.status(404).send('Not Found'));

export default app;
