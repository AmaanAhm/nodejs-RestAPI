const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const userController = require('../controller/user') 
const auth = require('../middleware/auth');
const userValidator = require('../validator/userValidator');

router.put('/user/role/:id', auth,userValidator(),(req, res, next)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map((error) => error.msg);
        return res.status(422).json({ errors: errorMsgs });
    }
    userController.updateRoleId(req, res, next)
})

module.exports = router;
