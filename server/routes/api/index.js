import express from 'express';

import userAPIRouter from './user.api';

const router = express.Router();

router.use('/user', userAPIRouter);

export default router;