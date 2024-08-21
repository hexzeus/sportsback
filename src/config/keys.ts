import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log('Environment Variables Loaded:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not Loaded');
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME ? 'Loaded' : 'Not Loaded');
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? 'Loaded' : 'Not Loaded');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');
console.log('PORT:', process.env.PORT || 5001);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'Loaded' : 'Not Loaded');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'Loaded' : 'Not Loaded');
console.log('AWS_S3_BUCKET_NAME:', process.env.AWS_S3_BUCKET_NAME ? 'Loaded' : 'Not Loaded');
console.log('AWS_REGION:', process.env.AWS_REGION ? 'Loaded' : 'Not Loaded');

// Exporting environment variables
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001;

// Exporting AWS-related environment variables
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;
export const AWS_REGION = process.env.AWS_REGION as string;
