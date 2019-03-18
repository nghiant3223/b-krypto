import express from 'express';

import { uploadFile } from '../../middlewares/uploadFile';
import { uploadFolder, makeDirectory } from '../../middlewares/uploadFolder';

const router = express();

router.post('/file', uploadFile, function (req, res) {
    const resData = { plaintext: req.files.plaintext[0], key: req.files.key[0] };
    res.status(200).send(resData);
});

router.post('/folder/:folderName', makeDirectory, uploadFolder, function (req, res) {
    const resData = { plaintext: {foldername: req.hashedFolderName} , key: req.files.find(file => file.fieldname === 'key') };
    res.status(200).send(resData);
});

export default router;