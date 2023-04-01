const { body } = require('express-validator');
const User = require('../models/UserModel');

const isEmailAlreadyRegistered = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return Promise.reject('Email is already registered');
  }
};

const registerValidator = () => {
  return [
    body('email').isEmail().withMessage('Please provide a valid email').custom(isEmailAlreadyRegistered),
    body('first_name').notEmpty()
  ]
};

module.exports = registerValidator;
