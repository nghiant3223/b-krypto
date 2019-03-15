import express from 'express';
import { generateKeyPair } from 'crypto';

const router = express();

router.get('/:length', function (req, res, next) {
    const { length } = req.params;
    generateKeyPair('rsa', {
        modulusLength: parseInt(length, 10),
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    }, function (err, publicKey, privateKey) {
        if (err) next({ message: 'Something wrong with your length' });
        else res.status(200).send({ publicKey, privateKey });
    });
});
export default router;