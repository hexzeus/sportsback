import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import adminRoutes from './routes/adminRoutes'; // Admin routes
import betRoutes from './routes/betRoutes'; // Bet routes
import { errorHandler } from './middlewares/errorHandler'; // Error handling middleware

const app = express();
const PORT = process.env.PORT || 5000; // Use environment-provided PORT or default to 5000

// Apply Helmet with secure CSP
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", "http://localhost:5000", "http://localhost:3000"], // Allow both backend and frontend
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Allow styles and Google Fonts
                imgSrc: ["'self'", "data:"], // Allow images and data URIs
                fontSrc: ["'self'", "https://fonts.gstatic.com"], // Allow Google Fonts
                connectSrc: ["'self'", "http://localhost:5000", "http://localhost:3000"], // Allow connections from both backend and frontend
            },
        },
        crossOriginEmbedderPolicy: false, // Disable COEP for compatibility
    })
);

// Enable CORS to allow requests from the frontend
app.use(
    cors({
        origin: ['http://localhost:3000'], // Allow frontend origin
        credentials: true, // Allow credentials like cookies to be sent
    })
);

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use admin and bet routes under their respective paths
app.use('/api/admin', adminRoutes); // Admin routes at /api/admin
app.use('/api/bets', betRoutes); // Bet routes at /api/bets

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Handle root route
app.get('/', (req, res) => {
    res.send('Welcome to the Betting API');
});

// Error handling middleware
app.use(errorHandler);

// Catch-all route handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the server on the dynamic PORT provided by Render or fallback to 5000
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
