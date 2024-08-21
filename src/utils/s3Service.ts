import AWS from 'aws-sdk';

// Configure AWS S3 with your credentials and region
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, // Ensure this is set in your .env file
});

// Function to get a presigned URL for uploading an image
export const getPresignedUrl = (fileName: string, fileType: string) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
        Key: `${fileName}`, // The file name or path
        Expires: 60, // URL expiration time in seconds
        ContentType: fileType, // MIME type of the file
    };

    return s3.getSignedUrlPromise('putObject', params); // Generate the signed URL
};
