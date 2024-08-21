import { Router } from 'express';
import { getPresignedUrl } from '../utils/s3Service'; // Assuming this is the correct path

const router = Router();

// POST route to get a presigned URL for uploading to S3
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
