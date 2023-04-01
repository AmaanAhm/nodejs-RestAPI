const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const loginController = require('../controller/login');
const loginValidator = require('../validator/loginvalidator');

router.post('/login', loginValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map((error) => error.msg);
        return res.status(422).json({ errors: errorMsgs });
    }
    loginController.login(req, res, next);
});

router.get('/verify-token', loginController.verifyToken);
router.post('/refresh-token', loginController.refreshToken);

module.exports = router;
