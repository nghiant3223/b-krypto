import multer from 'multer';
import crypto from 'crypto';

export const uploadFile =  multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
            const matches = /(.*)[.](.*)$/.exec(file.originalname);
            const extension = matches ? matches[2] : '';
            const hashedFileName = crypto.createHash('sha1').update(`${file.originalname}-${(new Date().getTime().toString())}`).digest('hex');
            const fullFilename = `${hashedFileName}.${extension}`;

            cb(null, fullFilename);
        }
    })
}).fields([{ name: 'plaintext', maxCount: 1 }, { name: 'key', maxCount: 1 }]);