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

// Service function to generate a presigned URL for uploading files to S3
export const getPresignedUrlService = async (fileName: string, fileType: string) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
        Key: fileName, // The file name or path
        ContentType: fileType, // MIME type of the file
    });

    // Generate the presigned URL with a 60-second expiration
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return presignedUrl;
};
