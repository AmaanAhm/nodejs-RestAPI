const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerValidations = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone_number').isMobilePhone().withMessage('Invalid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];

module.exports = registerValidations;