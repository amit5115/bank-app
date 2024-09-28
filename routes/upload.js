const express = require('express');
const multer = require('multer');
const s3 = require('../utils/s3');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    const params = {
        Bucket: 'bank-app-23243',
        Key: file.originalname,
        Body: file.buffer,
    };

    s3.upload(params, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'File uploaded successfully', url: data.Location });
    });
});

module.exports = router;
