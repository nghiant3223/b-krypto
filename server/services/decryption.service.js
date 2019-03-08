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

export function aesDecrypt(ciphertext, key, socket, options) {
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
        const decipher = crypto.createDecipheriv(algorithm, keyInstance, iv);
        const ciphertextFilePath = path.join(rootDir, 'public', 'uploads', ciphertext);
        const plaintexFilePath = path.join(rootDir, 'public', 'uploads', getFileName(ciphertext));
        const keyFilePath = path.join(rootDir, 'public', 'uploads', key);
        const ciphertextFileStream = fs.createReadStream(ciphertextFilePath);
        const plaintextFileStream = fs.createWriteStream(plaintexFilePath);
        const ciphertextFileSize = fs.statSync(path.join(rootDir, 'public', 'uploads', ciphertext))["size"];

        let decipherSize = 0;

        decipher.on('readable', function () {
            const cummulativeCipher = decipher.read();
            decipherSize += cummulativeCipher ? cummulativeCipher.length : 0;
            const index = parseInt(decipherSize * flags.length / ciphertextFileSize, 10);
            if (!flags[index]) {
                flags[index] = true;
                socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
            }
        });

        plaintextFileStream.on('finish', function () {

            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(ciphertext)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.append(fs.createReadStream(plaintexFilePath), {
                name: getFileName(ciphertext)
            });
            archive.append(fs.createReadStream(keyFilePath), { name: key });
            archive.finalize();

            compressedStream.on('close', async function () {
                socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(ciphertext)}.zip` });
                try {
                    fs.unlinkSync(ciphertextFilePath);
                    fs.unlinkSync(keyFilePath);
                    fs.unlinkSync(plaintexFilePath);
                }
                catch (e) {
                    console.log('ciphertextFilePath, keyFilePath or plaintexFilePath not found');
                }
            });
        });

        ciphertextFileStream.pipe(decipher).pipe(plaintextFileStream);
    });
}

export function camelliaDecrypt(ciphertext, key, socket, options) {
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
        const decipher = crypto.createDecipheriv(algorithm, keyInstance, iv);
        const ciphertextFilePath = path.join(rootDir, 'public', 'uploads', ciphertext);
        const plaintexFilePath = path.join(rootDir, 'public', 'uploads', getFileName(ciphertext));
        const keyFilePath = path.join(rootDir, 'public', 'uploads', key);
        const ciphertextFileStream = fs.createReadStream(ciphertextFilePath);
        const plaintextFileStream = fs.createWriteStream(plaintexFilePath);
        const ciphertextFileSize = fs.statSync(path.join(rootDir, 'public', 'uploads', ciphertext))["size"];

        let decipherSize = 0;

        decipher.on('readable', function () {
            const cummulativeCipher = decipher.read();
            decipherSize += cummulativeCipher ? cummulativeCipher.length : 0;
            const index = parseInt(decipherSize * flags.length / ciphertextFileSize, 10);
            if (!flags[index]) {
                flags[index] = true;
                socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
            }
        });

        plaintextFileStream.on('finish', function () {
            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(ciphertext)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.append(fs.createReadStream(plaintexFilePath), {
                name: getFileName(ciphertext)
            });
            archive.append(fs.createReadStream(keyFilePath), { name: key });
            archive.finalize();

            compressedStream.on('close', async function () {
                socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(ciphertext)}.zip` });
                try {
                    fs.unlinkSync(ciphertextFilePath);
                    fs.unlinkSync(keyFilePath);
                    fs.unlinkSync(plaintexFilePath);
                }
                catch (e) {
                    console.log('ciphertextFilePath, keyFilePath or plaintexFilePath not found');
                }
            });
        });

        ciphertextFileStream.pipe(decipher).pipe(plaintextFileStream);
    });
}

export function aesFolderDecrypt(plaintext, key, socket, options) {
    const rootDir = process.cwd();
    const keyFilePath = path.join(rootDir, 'public', 'uploads', plaintext, key);
    const folderPath = path.join(rootDir, 'public', 'uploads', plaintext);
    const inputEncoding = "utf8";
    const outputEncoding = "uft8";

    fs.readFile(keyFilePath, 'utf8', function (err, password) {
        if (err) throw err;

        console.log(password);

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'aes-192-cbc';
                var key = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0);
        };
    
        fs.readdir(folderPath, function (err, files) {
            if (err) throw err;

            let percentage = 0;
            for (let file of files) {
                if (file !== key) {
                    const decipher = crypto.createDecipheriv(algorithm, key, iv);
                    const plaintextFilePath = path.join(rootDir, 'public', 'uploads', plaintext, file);
                    const encryptedFilePath = path.join(rootDir, 'public', 'uploads', plaintext, getFileName(file));
                    const decrypted = decipher.update(fs.readFileSync(plaintextFilePath, {encoding: 'hex'}), 'hex', 'utf8') + decipher.final('utf8');
                    
                    fs.writeFileSync(encryptedFilePath, decrypted, { encoding: 'utf8' });
                    fs.unlinkSync(plaintextFilePath);
                    for (let _percentage = percentage; _percentage < percentage + 95 / (files.length - 1); _percentage += 5)
                        socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
                    percentage += 95 / (files.length - 1);
                }
            }

            // socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

            // const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(plaintext)}.zip`));
            // const archive = archiver('zip', { zlib: { level: 9 } });

            // archive.pipe(compressedStream);
            // archive.directory(folderPath, false);
            // archive.finalize();

            // compressedStream.on('close', async function () {
            //     // socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(plaintext)}.zip` });

            //     rimraf(folderPath, function (err) {
            //         if (err) console.log(err);
            //     });
            // });
        });
    });
}