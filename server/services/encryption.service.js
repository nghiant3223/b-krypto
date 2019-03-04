import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

function getFileName(fullname) {
    const matches = /(.*)[.](.*)$/.exec(fullname);
    const fileName = matches ? matches[1] : fullname;
    return fileName;
}

export default function encrypt(plaintext, key, algorithm, socket) {
    const rootDir = process.cwd();
    fs.readFile(path.join(rootDir, 'public', 'uploads', key), 'utf8', function (err, password) {
        if (err) throw err;

        switch (algorithm) {
            case 'aes-192-cbc':
                var keyInstance = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0);
        };

        const flags = new Array(20).fill(false, 0, 20);
        const cipher = crypto.createCipheriv(algorithm, keyInstance, iv);
        const plaintextFilePath = path.join(rootDir, 'public', 'uploads', plaintext);
        const encryptedFilePath = path.join(rootDir, 'public', 'uploads', `${plaintext}.enc`);
        const keyFilePath = path.join(rootDir, 'public', 'uploads', key);
        const plaintextFileStream = fs.createReadStream(plaintextFilePath);
        const encryptedFileStream = fs.createWriteStream(encryptedFilePath);
        const plaintextFileSize = fs.statSync(path.join(rootDir, 'public', 'uploads', plaintext))["size"];
    
        let cipherSize = 0;

        cipher.on('readable', function () {
            const cummulativeCipher = cipher.read();
            cipherSize += cummulativeCipher ? cummulativeCipher.length : 0;
            const index = parseInt(cipherSize * flags.length / plaintextFileSize, 10);
            if (!flags[index]) {
                flags[index] = true;
                console.log('Emit');
            }
        });

        encryptedFileStream.on('finish', function () {
            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(plaintext)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.append(fs.createReadStream(encryptedFilePath), { name: `${plaintext}.enc` });
            archive.append(fs.createReadStream(keyFilePath), { name: key });
            archive.finalize();

            compressedStream.on('close', async function () {
                console.log('Data has been drained');
                Promise.all([fs.unlinkSync(plaintextFilePath), fs.unlinkSync(keyFilePath), fs.unlinkSync(encryptedFilePath)]);
            });
        });

        plaintextFileStream.pipe(cipher).pipe(encryptedFileStream);
    });
}