const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const roleController = require('../controller/role');

router.get('/role', auth, roleController.getRoles);
router.post('/role', roleController.createRole);
router.put('/role/:id', roleController.update);
router.delete('/role/:id', roleController.deleteRole);

module.exports = router;
