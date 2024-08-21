import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import adminRoutes from './routes/adminRoutes'; // Admin routes
import betRoutes from './routes/betRoutes'; // Bet routes
import s3Routes from './routes/s3Routes'; // S3 routes
import ticketRoutes from './routes/ticketRoutes'; // Ticket routes for handling tickets with image uploads
import { errorHandler } from './middlewares/errorHandler'; // Error handling middleware

const app = express();

// Apply Helmet with secure CSP
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", "https://sportsback.onrender.com", "http://localhost:3000", "https://fredssports.vercel.app"], // Allow localhost, Render, and Vercel domain
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                imgSrc: ["'self'", "data:", "https://alienreviewdb.s3.us-east-2.amazonaws.com"], // Allow images from your S3 bucket
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                connectSrc: ["'self'", "https://sportsback.onrender.com", "http://localhost:3000", "https://fredssports.vercel.app"], // Backend and frontend origins
            },
        },
        crossOriginEmbedderPolicy: false,
    })
);

// Enable CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://sportsback.onrender.com', 'https://fredssports.vercel.app'], // Allow localhost, Render, and the deployed frontend on Vercel
    credentials: true,
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/admin', adminRoutes);    // Admin routes
app.use('/api/bets', betRoutes);       // Bet routes
app.use('/api/s3', s3Routes);          // S3 routes for image uploads
app.use('/api/tickets', ticketRoutes); // Ticket routes for creating tickets

// Health check route
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Root route
app.get('/', (req, res) => res.send('Welcome to the Betting API'));

// Error handling middleware
app.use(errorHandler);

// Catch-all route handler
app.use((req, res) => res.status(404).send('Not Found'));

export default app;
