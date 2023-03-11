const express = require('express');
const router = express.Router();

const loginController = require('../controller/login');

router.post('/login', loginController.login);
// router.get('/token', loginController.verifyToken)
router.get('/verify-token', loginController.verifyToken);
router.post('/refresh-token', loginController.refreshToken)

module.exports = router;
