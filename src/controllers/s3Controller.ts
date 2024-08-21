import { getPresignedUrlService } from '../utils/s3Service'; // Import the S3 service function

// Controller function to get a presigned URL for S3 upload
export const getPresignedUrl = async (fileName: string, fileType: string) => {
    try {
        // Call the service function that interacts with AWS S3
        const presignedUrl = await getPresignedUrlService(fileName, fileType);
        return presignedUrl;
    } catch (err) {
        throw new Error('Error generating presigned URL');
    }
};
