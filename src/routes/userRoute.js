const express = require('express');
const router = express.Router();
const userController = require('../controller/user') 
const auth = require('../middleware/auth')

router.put('/user/role/:id', auth, userController.updateRoleId);

module.exports = router;
