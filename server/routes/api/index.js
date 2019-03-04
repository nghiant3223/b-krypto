const express = require('express');
const router = express.Router();

router.use('/user', require('./user.api'));

module.exports = router;