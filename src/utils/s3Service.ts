import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize the S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

// Function to get a presigned URL for uploading an image
export const getPresignedUrl = async (fileName: string, fileType: string) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
        Key: fileName, // The file name or path
        ContentType: fileType, // MIME type of the file
    });

    // Generate the signed URL
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return presignedUrl;
};
