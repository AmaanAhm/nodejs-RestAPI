const express = require('express');
const router = express.Router();

const roleController = require('../controller/role');

router.get('/role', roleController.getRoles);
router.post('/role', roleController.createRole);

module.exports = router;
