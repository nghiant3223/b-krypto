import express from 'express';

import userAPIRouter from './user.api';
import uploadAPIRouter from './upload.api';
import dowloadAPIRouter from './download.api';
import keyAPIRouter from './key.api';

const router = express.Router();

router.use('/user', userAPIRouter);
router.use('/upload', uploadAPIRouter);
router.use('/download', dowloadAPIRouter);
router.use('/key', keyAPIRouter);

export default router;