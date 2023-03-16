const { body } = require('express-validator');
const User = require('../schema/userSchema');

const isEmailAlreadyRegistered = async (req, res) => {
    const user = await User.findOne({ email, password });
    if (user) {
        return Promise.reject('Email is already registered');
      }
    }; 

const loginValidator = ()=>{
    return [
    body('email').isEmail().withMessage('Please provide a valid email').custom(isEmailAlreadyRegistered),
    body('password').notEmpty()
    ]
}

module.exports = loginValidator;
