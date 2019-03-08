import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

export const uploadFolder = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            console.log(req.hashedFolderName);
            cb(null, `public/uploads/${req.hashedFolderName}/`);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
}).fields([{ name: 'plaintext', maxCount: 50 }, { name: 'key', maxCount: 1 }]);

export function makeDirectory(req, res, next) {
    const hashedFolderName = crypto.createHash('sha1').update(`${req.params.folderName}-${(new Date().getTime().toString())}`).digest('hex');
    const rootDir = process.cwd();

    req.hashedFolderName = hashedFolderName;
    fs.mkdirSync(path.join(rootDir, 'public', 'uploads', hashedFolderName));
    next();
}