import { Router } from 'express';
import { getPresignedUrl } from '../controllers/s3Controller'; // Controller that handles presigned URL generation
import { verifyAdminToken } from '../middlewares/authMiddleware'; // Middleware for verifying admin tokens

const router = Router();

// POST route to get a presigned URL for uploading to S3
router.post('/get-upload-url', verifyAdminToken, async (req, res) => {
    const { fileName, fileType } = req.body;

    try {
        // Call the controller function that generates the presigned URL
        const uploadUrl = await getPresignedUrl(fileName, fileType);

        // Return the generated presigned URL to the client
        res.status(200).json(uploadUrl);
    } catch (err) {
        console.error('Error generating upload URL:', err);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
});

export default router; // 
