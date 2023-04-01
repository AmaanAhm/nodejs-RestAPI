const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleController = require('../controller/role');
const roleValidator = require('../validator/roleValidator');
const { validationResult } = require('express-validator');

router.get('/role', auth, roleController.getRoles);

router.post('/role', roleValidator(), auth, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    roleController.createRole(req, res, next);
});

router.put('/role/:id', auth, roleController.update);
router.delete('/role/:id', auth,roleController.deleteRole);

module.exports = router;
