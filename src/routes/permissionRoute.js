const express = require('express');
const router = express.Router();

const permissionController  = require('../controller/permission') 


router.post('/permission', permissionController.createPermission);
router.get('/getPermission', permissionController.getPermission);
router.put('/updatePermission/:id', permissionController.updatePermission);
router.delete('/deletePermission/:id', permissionController.deletePermission )

module.exports = router;