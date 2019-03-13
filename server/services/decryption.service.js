import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import rimraf from 'rimraf';
var constants = require('constants');

import * as sharedConstants from '../shares/constants';

function getFileName(fullname) {
    const matches = /(.*)[.](.*)$/.exec(fullname);
    const fileName = matches ? matches[1] : fullname;
    return fileName;
}

export function aesDecrypt(ciphertext, key, socket, options) {
    const rootDir = process.cwd();
    fs.readFile(path.join(rootDir, 'public', 'uploads', key), 'utf8', function (err, password) {
        if (err) return socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Key not found' });

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'aes-192-cbc';
                var keyInstance = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0);
        };

        try {
            var flags = new Array(20).fill(false, 0, 20);
            var decipher = crypto.createDecipheriv(algorithm, keyInstance, iv);
            var ciphertextFilePath = path.join(rootDir, 'public', 'uploads', ciphertext);
            var plaintexFilePath = path.join(rootDir, 'public', 'uploads', getFileName(ciphertext));
            var keyFilePath = path.join(rootDir, 'public', 'uploads', key);
            var ciphertextFileStream = fs.createReadStream(ciphertextFilePath);
            var plaintextFileStream = fs.createWriteStream(plaintexFilePath);
            var ciphertextFileSize = fs.statSync(path.join(rootDir, 'public', 'uploads', ciphertext))["size"];
        } catch {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
            return;
        }

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

        decipher.on('error', function () {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
        });

        plaintextFileStream.on('finish', function () {
            socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

            
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
                    socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Error while removing file' });
                }
            });
        });

        ciphertextFileStream.pipe(decipher).pipe(plaintextFileStream);
    });
}

export function camelliaDecrypt(ciphertext, key, socket, options) {
    const rootDir = process.cwd();
    fs.readFile(path.join(rootDir, 'public', 'uploads', key), 'utf8', function (err, password) {
        if (err) return socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Key not found' });

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'camellia-192-cbc';
                var keyInstance = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0);
        };

        try {
            var flags = new Array(20).fill(false, 0, 20);
            var decipher = crypto.createDecipheriv(algorithm, keyInstance, iv);
            var ciphertextFilePath = path.join(rootDir, 'public', 'uploads', ciphertext);
            var plaintexFilePath = path.join(rootDir, 'public', 'uploads', getFileName(ciphertext));
            var keyFilePath = path.join(rootDir, 'public', 'uploads', key);
            var ciphertextFileStream = fs.createReadStream(ciphertextFilePath);
            var plaintextFileStream = fs.createWriteStream(plaintexFilePath);
            var ciphertextFileSize = fs.statSync(path.join(rootDir, 'public', 'uploads', ciphertext))["size"];
        } catch {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
            return;
        }   
            
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

        decipher.on('error', function () {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
        });

        plaintextFileStream.on('finish', function () {
            socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

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
                    socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Error while removing file' });
                }
            });
        });

        ciphertextFileStream.pipe(decipher).pipe(plaintextFileStream);
    });
}

export function rsaDecrypt(ciphertext, key, socket, options) {
    const rootDir = process.cwd();
    fs.readFile(path.join(rootDir, 'public', 'uploads', key), 'utf8', function (err, password) {
        if (err) throw err;

        //get plaintext from receiver's private key
        const _plaintext = crypto.privateDecrypt( {
            key: password,
            padding: constants.RSA_NO_PADDING 
        } , Buffer.from(ciphertext, "base64"))
        const plaintext = _plaintext.toString('base64');
        // const showThis = JSON.stringify(plaintext)
        // console.log(showThis.data)
        
        //path for saving encrypted file
        const ciphertextFilePath = path.join(rootDir, 'public', 'uploads', ciphertext);
        const plaintexFilePath = path.join(rootDir, 'public', 'uploads', getFileName(ciphertext));
        const keyFilePath = path.join(rootDir, 'public', 'uploads', key);
        
        //start to save decrypted file
        fs.writeFile(plaintexFilePath, plaintext,  function() {
            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(ciphertext)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.append(fs.createReadStream(plaintexFilePath), { name: getFileName(ciphertext)  });
            archive.append(fs.createReadStream(keyFilePath), { name: key });
            archive.finalize();

            socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(ciphertext)}.zip` });
            try {
                fs.unlinkSync(ciphertextFilePath);
                fs.unlinkSync(keyFilePath);
                fs.unlinkSync(plaintexFilePath);
            }
            catch (e) {
                console.log('ciphertextFilePath, keyFilePath or plaintexFilePath not found');
            }
        })

    });
}

export function aesFolderDecrypt(folder, key, socket, options) {
    const rootDir = process.cwd();
    const keyFilePath = path.join(rootDir, 'public', 'uploads', folder, key);
    const folderPath = path.join(rootDir, 'public', 'uploads', folder);

    fs.readFile(keyFilePath, 'utf8', function (err, password) {
        if (err) return socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Key not found' });

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'aes-192-cbc';
                var keyInstance = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0);
        };
    
        fs.readdir(folderPath, function (err, files) {
            if (err) throw err;

            let percentage = 0;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (file !== key) {
                    const decipher = crypto.createDecipheriv(algorithm, keyInstance, iv);
                    const plaintextFilePath = path.join(rootDir, 'public', 'uploads', folder, file);
                    const encryptedFilePath = path.join(rootDir, 'public', 'uploads', folder, `${getFileName(file)}.dec`);
                    
                    try {
                        const decrypted = decipher.update(fs.readFileSync(plaintextFilePath, { encoding: 'hex' }), 'hex', 'binary') + decipher.final('binary');
                        fs.writeFileSync(encryptedFilePath, decrypted, { encoding: 'binary' });
                        fs.unlinkSync(plaintextFilePath);
                    } catch (e) {
                        console.log(e);
                        socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: "Something wrong with your data" });
                        return;
                    }
                    for (let _percentage = percentage; _percentage < percentage + 95 / (files.length - 1); _percentage += 5) {
                        socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
                    }
                    percentage += 95 / (files.length - 1);
                }
            }

            socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(folder)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.directory(folderPath, false);
            archive.finalize();

            compressedStream.on('close', async function () {
                socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(folder)}.zip` });

                rimraf(folderPath, function (err) {
                    if (err) console.log(err);
                });
            });
        });
    });
}

export function camelliaFolderDecrypt(folder, key, socket, options) {
    const rootDir = process.cwd();
    const keyFilePath = path.join(rootDir, 'public', 'uploads', folder, key);
    const folderPath = path.join(rootDir, 'public', 'uploads', folder);

    fs.readFile(keyFilePath, 'utf8', function (err, password) {
        if (err) return socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Key not found' });

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'camellia-192-cbc';
                var keyInstance = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0);
        };
    
        fs.readdir(folderPath, function (err, files) {
            if (err) throw err;

            let percentage = 0;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (file !== key) {
                    const decipher = crypto.createDecipheriv(algorithm, keyInstance, iv);
                    const plaintextFilePath = path.join(rootDir, 'public', 'uploads', folder, file);
                    const encryptedFilePath = path.join(rootDir, 'public', 'uploads', folder, `${getFileName(file)}.dec`);

                    try {
                        const decrypted = decipher.update(fs.readFileSync(plaintextFilePath, { encoding: 'hex' }), 'hex', 'binary') + decipher.final('binary');
                        fs.writeFileSync(encryptedFilePath, decrypted, { encoding: 'binary' });
                        fs.unlinkSync(plaintextFilePath);
                    }
                    catch (e) {
                        console.log(e);
                        socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: "Something wrong with your data" });
                        return;
                    }
                    for (let _percentage = percentage; _percentage < percentage + 95 / (files.length - 1); _percentage += 5) {
                        socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
                    }
                    percentage += 95 / (files.length - 1);
                }
            }

            socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

            const compressedStream = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(folder)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedStream);
            archive.directory(folderPath, false);
            archive.finalize();

            compressedStream.on('close', async function () {
                socket.emit(sharedConstants.SERVER_FINISHES_COMPRESSION, { fileName: `${getFileName(folder)}.zip` });

                rimraf(folderPath, function (err) {
                    if (err) console.log(err);
                });
            });
        });
    });
}