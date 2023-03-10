const express = require('express');
const router = express.Router();
const userController = require('../controller/users');
router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);

module.exports = router;