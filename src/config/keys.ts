import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log('Environment Variables Loaded:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not Loaded');
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME ? 'Loaded' : 'Not Loaded');
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? 'Loaded' : 'Not Loaded');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');
console.log('PORT:', process.env.PORT || 4000);

// Exporting environment variables
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
