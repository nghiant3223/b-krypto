import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

export const uploadFolder = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/uploads/${req.hashedFolderName}/`);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
}).fields([{ name: 'plaintext', maxCount: 50 }, { name: 'key', maxCount: 1 }]);

export function makeDirectory(req, res, next) {
<<<<<<< HEAD
    const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const port = req.headers['x-forwarded-port'] || req.connection.remotePort;
    const hashedFolderName = crypto.createHash('sha1').update(`${req.params.folderName}-${(new Date().getTime().toString())}-${address}-${port}`).digest('hex');
=======
    const hashedFolderName = crypto.createHash('sha1').update(`${req.params.folderName}-${(new Date().getTime().toString())}`).digest('hex');
>>>>>>> 587ee88814bedf6d8fff054765a8d47ba0630799
    const rootDir = process.cwd();

    req.hashedFolderName = hashedFolderName;
    fs.mkdirSync(path.join(rootDir, 'public', 'uploads', hashedFolderName));
    next();
}