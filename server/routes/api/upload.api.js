import express from 'express';
import multer from 'multer';
import crypto from 'crypto';

const router = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const matches = /(.*)[.](.*)$/.exec(file.originalname);
        const extension = matches ? matches[2] : '';
        const hashedFileName = crypto.createHash('sha1').update((new Date().getTime().toString())).digest('hex');
        const fullFilename = `${hashedFileName}.${extension}`;

        cb(null, fullFilename);
    }
});

const upload = multer({ storage: storage });
const fields = upload.fields([{ name: 'plaintext', maxCount: 1 }, { name: 'key', maxCount: 1 }]);

router.post('/', fields, function (req, res) {
    const resData = { plaintext: req.files.plaintext[0], key: req.files.key[0] };

    setTimeout(() => {
        res.status(200).send(resData);
    }, 3000);
});

export default router;