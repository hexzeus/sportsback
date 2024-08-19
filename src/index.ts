import app from './app'; // Assuming this is where your Express app is defined
import sequelize from './config/database'; // Adjust the path as needed

const startServer = async () => {
    try {
        await sequelize.sync(); // Sync models with the database
        console.log('🚀 Database connected and synced.');

        const PORT = process.env.PORT || 5001; // Use environment-provided PORT or default to 5001
        app.listen(PORT, () => {
            console.log(`
                ==============================================
                🚀 Server is running on port ${PORT}! 🚀
                🛠️  Application is now live and ready to serve! 🛠️
                ==============================================
            `);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1); // Exit the process if we can't start the server
    }
};

startServer();
