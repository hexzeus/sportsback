import app from './app'; // Assuming this is where your Express app is defined
import { PORT } from './config/database'; // Assuming your environment variables are exported from here
import sequelize from './config/database'; // Adjust the path as needed

const startServer = async () => {
    try {
        await sequelize.sync(); // Sync models with the database
        console.log('🚀 Database connected and synced.');

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
    }
};

startServer();
