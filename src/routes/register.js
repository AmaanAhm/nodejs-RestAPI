const express = require('express');
const router = express.Router();
const registerController = require('../controller/register');




// Define register route
router.post('/register', registerController.register);

module.exports = router;