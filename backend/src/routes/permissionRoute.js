const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth')
const permissionController  = require('../controller/permission'); 
const permissionValidator = require('../validator/permissionValidator');


router.post('/permission', permissionValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    permissionController.createPermission(req, res, next);
}); 
 


router.get('/getPermission', auth, permissionController.getPermission);
router.put('/updatePermission/:id', permissionController.updatePermission);
router.delete('/deletePermission/:id', permissionController.deletePermission )

module.exports = router;