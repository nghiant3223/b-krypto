import express from 'express';

import userAPIRouter from './user.api';
import uploadAPIRouter from './upload.api';

const router = express.Router();

router.use('/user', userAPIRouter);
router.use('/upload', uploadAPIRouter);

export default router;