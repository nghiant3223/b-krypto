import multer from 'multer';
import crypto from 'crypto';

export const uploadFile =  multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
<<<<<<< HEAD
            const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            const port = req.headers['x-forwarded-port'] || req.connection.remotePort;
            const matches = /(.*)[.](.*)$/.exec(file.originalname);
            const extension = matches && matches[2];
            const hashedFileName = crypto.createHash('sha1').update(`${file.originalname}-${(new Date().getTime().toString())}-${address}-${port}`).digest('hex');

            if (extension) cb(null, `${hashedFileName}.${extension}`);
            else cb(null, `${hashedFileName}`);
=======
            const matches = /(.*)[.](.*)$/.exec(file.originalname);
            const extension = matches ? matches[2] : '';
            const hashedFileName = crypto.createHash('sha1').update(`${file.originalname}-${(new Date().getTime().toString())}`).digest('hex');
            const fullFilename = `${hashedFileName}.${extension}`;

            cb(null, fullFilename);
>>>>>>> 587ee88814bedf6d8fff054765a8d47ba0630799
        }
    })
}).fields([{ name: 'plaintext', maxCount: 1 }, { name: 'key', maxCount: 1 }]);