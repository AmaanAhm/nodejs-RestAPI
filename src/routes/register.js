const express = require('express');
const router = express.Router();
const registerController = require('../controller/register');
const {validationResult } = require('express-validator');
const registerValidator = require('../validator/registerValidator');


  // Define register route with validation
  router.post('/register', registerValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map(error => error.msg);
    return res.status(422).json({ errors: errorMsgs });
    }
    registerController.register(req, res, next);
  });

  router.put('/updateUser/:id',registerController.updateUser);
  // router.put('/editRole_id/:id', registerController.editRoid);  
  module.exports = router;
  