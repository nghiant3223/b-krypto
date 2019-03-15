import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/:fileName', function (req, res, next) {
    const { fileName } = req.params;
    const filePath = path.join('public', 'uploads', fileName);

    fs.exists(filePath, function (exists) {
        if (!exists) return next({ message: 'File not found', status: 404 });
        res.download(filePath);
    });
});

export default router;