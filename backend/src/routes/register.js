const express = require('express');
const router = express.Router();
const registerController = require('../controller/register');
const {validationResult } = require('express-validator');
const registerValidator = require('../validator/registerValidator');


  // Define register route with validation
  router.post('/register', registerValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    registerController.register(req, res, next);
  });

  router.put('/updateUser/:id',registerController.updateUser);
  module.exports = router;
  