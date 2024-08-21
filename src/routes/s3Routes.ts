import { Router } from 'express';
import { getPresignedUrl } from '../utils/s3Service'; // Utility function to generate presigned URL

const router = Router();

// Route to generate a presigned URL for S3 uploads
router.post('/get-upload-url', async (req, res) => {
    const { fileName, fileType } = req.body;

    try {
        const uploadUrl = await getPresignedUrl(fileName, fileType);
        res.status(200).json(uploadUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
});

export default router;
