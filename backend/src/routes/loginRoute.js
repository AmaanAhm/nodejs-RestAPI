const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const loginController = require('../controller/login');
const loginValidator = require('../validator/loginvalidator');

router.post('/login', loginValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    loginController.login(req, res, next);
});

/**
 * @openapi
 * /login:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/verify-token', loginController.verifyToken);
router.post('/refresh-token', loginController.refreshToken);

module.exports = router;
