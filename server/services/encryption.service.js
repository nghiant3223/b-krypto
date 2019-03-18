import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import rimraf from 'rimraf';
import klawSync from 'klaw-sync';

import * as sharedConstants from '../shares/constants';

function getFileName(fullname) {
    const matches = /(.*)[.](.*)$/.exec(fullname);
    const fileName = matches ? matches[1] : fullname;
    return fileName;
}

export function aesEncrypt(plaintext, key, socket, options) {
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
            var cipher = crypto.createCipheriv(algorithm, keyInstance, iv);
            var plaintextFilePath = path.join(rootDir, 'public', 'uploads', plaintext);
            var encryptedFilePath = path.join(rootDir, 'public', 'uploads', `${plaintext}.enc`);
            var keyFilePath = path.join(rootDir, 'public', 'uploads', key);
            var plaintextFileStream = fs.createReadStream(plaintextFilePath);
            var encryptedFileStream = fs.createWriteStream(encryptedFilePath);
            var plaintextFileSize = fs.statSync(path.join(rootDir, 'public', 'uploads', plaintext))["size"];
        } catch {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
            return;
        }

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

        cipher.on('error', function () {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
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
                    socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Error while removing file' });
                }
            });
        });

        plaintextFileStream.pipe(cipher).pipe(encryptedFileStream);
    });
}

export function camelliaEncrypt(plaintext, key, socket, options) {
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
            var cipher = crypto.createCipheriv(algorithm, keyInstance, iv);
            var plaintextFilePath = path.join(rootDir, 'public', 'uploads', plaintext);
            var encryptedFilePath = path.join(rootDir, 'public', 'uploads', `${plaintext}.enc`);
            var keyFilePath = path.join(rootDir, 'public', 'uploads', key);
            var plaintextFileStream = fs.createReadStream(plaintextFilePath);
            var encryptedFileStream = fs.createWriteStream(encryptedFilePath);
            var plaintextFileSize = fs.statSync(path.join(rootDir, 'public', 'uploads', plaintext))["size"];
        } catch {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
            return;
        }

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

        cipher.on('error', function () {
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Something wrong with your data' });
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
                    socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: 'Error while removing file' });
                }
            });
        });

        plaintextFileStream.pipe(cipher).pipe(encryptedFileStream);
    });
}

export function rsaEncrypt(plaintext, key, socket, options) {
    const rootDir = process.cwd();

    fs.readFile(path.join(rootDir, 'public', 'uploads', key), 'utf8', function (err, password) {
        if (err) throw err;
        const plaintextFilePath = path.join(rootDir, 'public', 'uploads', plaintext);
        const encryptedFilePath = path.join(rootDir, 'public', 'uploads', `${plaintext}.enc`);
        const keyFilePath = path.join(rootDir, 'public', 'uploads', key);

        try {
            const encryptBuffer = Buffer.from(fs.readFileSync(plaintextFilePath));
            var encrypted = crypto.publicEncrypt(password, encryptBuffer);
        } catch (e) {
            console.log(e);
            socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: "Something wrong with your data. Maybe data is too large" });
            return;
        }

        socket.emit(sharedConstants.SERVER_FINISHES_ENCRYPTION);

        fs.writeFile(encryptedFilePath, encrypted, { encoding: 'base64' }, function () {
            const compressedItem = fs.createWriteStream(path.join(rootDir, 'public', 'uploads', `${getFileName(plaintext)}.zip`));
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.pipe(compressedItem);
            archive.append(fs.createReadStream(encryptedFilePath), { name: `${plaintext}.enc` });
            archive.append(fs.createReadStream(keyFilePath), { name: key });
            archive.finalize();

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
}

export function camelliaFolderEncrypt(folder, key, socket, options) {
    const rootDir = process.cwd();
    const keyFilePath = path.join(rootDir, 'public', 'uploads', folder, key);
    const folderPath = path.join(rootDir, 'public', 'uploads', folder);

    fs.readFile(keyFilePath, 'utf8', function (err, password) {
        if (err) throw err;

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'camellia-192-cbc';
                var keyInstance = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0); // Initialization vector.
        };

        const files = getFiles(folderPath);
        if (err) throw err;

        let percentage = 0;
        for (let file of files) {
            if (file !== key) {
                const plaintextFilePath = file;
                const plaintextFileName = file.split('/').slice(-1)[0];
                const encryptedFilePath = `${file.split('/').slice(0, -1).join('/')}/${plaintextFileName}.enc`;
                const cipher = crypto.createCipheriv(algorithm, keyInstance, iv);

                try {
                    const encrypted = cipher.update(fs.readFileSync(plaintextFilePath, { encoding: 'binary' }), 'binary', 'hex') + cipher.final('hex');
                    fs.writeFileSync(encryptedFilePath, encrypted, { encoding: 'hex' });
                    fs.unlinkSync(plaintextFilePath);
                } catch (e) {
                    console.log(e);
                    socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: "Something wrong with your data. Maybe data is too large" });
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
}

export function rsaFolderEncrypt(folder, key, socket, options) {
    const rootDir = process.cwd();
    const keyFilePath = path.join(rootDir, 'public', 'uploads', folder, key);
    const folderPath = path.join(rootDir, 'public', 'uploads', folder);

    fs.readFile(keyFilePath, 'utf8', function (err, password) {
        const files = getFiles(folderPath);
        if (err) throw err;

        let percentage = 0;
        for (let file of files) {
            if (file !== key) {
                const plaintextFilePath = file;
                const plaintextFileName = file.split('/').slice(-1)[0];
                const encryptedFilePath = `${file.split('/').slice(0, -1).join('/')}/${plaintextFileName}.enc`;
                try {
                    const encryptBuffer = Buffer.from(fs.readFileSync(plaintextFilePath));
                    const encrypted = crypto.publicEncrypt(password, encryptBuffer);
                    fs.writeFileSync(encryptedFilePath, encrypted, { encoding: 'base64' });
                    fs.unlinkSync(plaintextFilePath);
                }
                catch (e) {
                    console.log(e);
                    socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: "Something wrong with your data. Maybe data is too large" });
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
}

export function aesFolderEncrypt(folder, key, socket, options) {
    const rootDir = process.cwd();
    const keyFilePath = path.join(rootDir, 'public', 'uploads', folder, key);
    const folderPath = path.join(rootDir, 'public', 'uploads', folder);

    fs.readFile(keyFilePath, 'utf8', function (err, password) {
        if (err) throw err;

        switch (options) {
            default: // Default case is for aes-192-cbc
                var algorithm = 'aes-192-cbc';
                var keyInstance = crypto.scryptSync(password, 'salt', 24);
                var iv = Buffer.alloc(16, 0); // Initialization vector.
        };

        const files = getFiles(folderPath);
        if (err) throw err;

        let percentage = 0;
        for (let file of files) {
            const plaintextFilePath = file;
            const plaintextFileName = file.split('/').slice(-1)[0];
            const encryptedFilePath = `${file.split('/').slice(0, -1).join('/')}/${plaintextFileName}.enc`;
            const cipher = crypto.createCipheriv(algorithm, keyInstance, iv);

            try {
                const encrypted = cipher.update(fs.readFileSync(plaintextFilePath, { encoding: 'binary' }), 'binary', 'hex') + cipher.final('hex');
                fs.writeFileSync(encryptedFilePath, encrypted, { encoding: 'hex' });
                fs.unlinkSync(plaintextFilePath);
            } catch (e) {
                console.log(e);
                socket.emit(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, { message: "Something wrong with your data. Maybe data is too large" });
                return;
            }
            for (let _percentage = percentage; _percentage < percentage + 95 / (files.length - 1); _percentage += 5) {
                socket.emit(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS);
            }
            percentage += 95 / (files.length - 1);
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
}

function getFiles(folderPath) {
    const userFolderPath = klawSync(folderPath, { nofile: true })[0].path;
    const filesToEncrypt = klawSync(userFolderPath, { nodir: true }).map(file => file.path.replace(/\\/g, '/'));
    return filesToEncrypt;
}