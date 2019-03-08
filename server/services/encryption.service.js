import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

import * as sharedConstants from '../shares/constants';

function getFileName(fullname) {
    const matches = /(.*)[.](.*)$/.exec(fullname);
    const fileName = matches ? matches[1] : fullname;
    return fileName;
}

export function aesEncrypt(plaintext, key, socket, options) {
    const rootDir = process.cwd();
    fs.readFile(path.join(rootDir, 'public', 'uploads', key), 'utf8', function (err, password) {
        if (err) throw err;

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'aes-192-cbc';
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
                socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
            }
        });

        encryptedFileStream.on('finish', function () {
            socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(plaintext)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.append(fs.createReadStream(encryptedFilePath), { name: `${plaintext}.enc` });
            archive.append(fs.createReadStream(keyFilePath), { name: key });
            archive.finalize();

            compressedStream.on('close', async function () {
                socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(plaintext)}.zip` });

                try {
                    fs.unlinkSync(plaintextFilePath);
                    fs.unlinkSync(keyFilePath);
                    fs.unlinkSync(encryptedFilePath);
                } catch (e) {
                    console.log('plaintextFilePath, keyFilePath or encryptedFilePath not found');
                }
            });
        });

        plaintextFileStream.pipe(cipher).pipe(encryptedFileStream);
    });
}

export function camelliaEncrypt(plaintext, key, socket, options) {
    const rootDir = process.cwd();
    fs.readFile(path.join(rootDir, 'public', 'uploads', key), 'utf8', function (err, password) {
        if (err) throw err;

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'camellia-192-cbc';
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
                socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
            }
        });

        encryptedFileStream.on('finish', function () {
            socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(plaintext)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.append(fs.createReadStream(encryptedFilePath), { name: `${plaintext}.enc` });
            archive.append(fs.createReadStream(keyFilePath), { name: key });
            archive.finalize();

            compressedStream.on('close', async function () {
                socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(plaintext)}.zip` });

                try {
                    fs.unlinkSync(plaintextFilePath);
                    fs.unlinkSync(keyFilePath);
                    fs.unlinkSync(encryptedFilePath);
                } catch (e) {
                    console.log('plaintextFilePath, keyFilePath or encryptedFilePath not found');
                }
            });
        });

        plaintextFileStream.pipe(cipher).pipe(encryptedFileStream);
    });
}

export function aesFolderEncrypt(plaintext, key, socket, options) {
    const rootDir = process.cwd();
    const keyFilePath = path.join(rootDir, 'public', 'uploads', plaintext, key);
    const folderPath = path.join(rootDir, 'public', 'uploads', plaintext);
    fs.readFile(keyFilePath, 'utf8', function (err, password) {
        if (err) throw err;

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'aes-192-cbc';
        };

        const flags = new Array(20).fill(false, 0, 20);


        const inputEncoding = "utf8";
        const outputEncoding = "hex";
    
        fs.readdir(folderPath, function (err, files) {
            if (err) throw err;

            for (let file of files) {
                const plaintextFilePath = path.join(rootDir, 'public', 'uploads', plaintext, file);
                const encryptedFilePath = path.join(rootDir, 'public', 'uploads', plaintext, `${file}.enc`);
                const cipher = crypto.createCipher(algorithm, password);
                const ciphered = cipher.update(fs.readFileSync(plaintextFilePath), inputEncoding, outputEncoding) + cipher.final(outputEncoding);
                
                fs.writeFileSync(encryptedFilePath, ciphered)
            }
        })
    });

}