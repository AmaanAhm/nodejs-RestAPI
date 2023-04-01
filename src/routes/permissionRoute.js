const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth')
const permissionController  = require('../controller/permission'); 
const permissionValidator = require('../validator/permissionValidator');


router.post('/permission', permissionValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
        return res.status(422).json({ errors: errorMsgs });
    }
    permissionController.createPermission(req, res, next);
}); 
 


router.get('/getPermission', auth, permissionController.getPermission);
router.put('/updatePermission/:id', auth, permissionController.updatePermission);
router.delete('/deletePermission/:id',auth, permissionController.deletePermission )

module.exports = router;