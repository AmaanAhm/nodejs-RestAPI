const { body } = require('express-validator');
const User = require('../models/UserModel');

const isUserExist = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        return Promise.reject('Record Not Found');
    }
};

const loginValidator = () => {
    return [
        body('email').isEmail().withMessage('Please provide a valid email').custom(isUserExist),
        body('password').notEmpty(),
    ];
};

module.exports = loginValidator;
