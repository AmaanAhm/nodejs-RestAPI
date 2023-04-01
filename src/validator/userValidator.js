const { body } = require('express-validator');
const User = require('../models/UserModel');

const isUserExist = async (user_id) => {
    const check = await User.findOne({ user_id });
    if (check) {
        return Promise.reject('User doesnot exist');
    }
};


const userValidator = () => {
    return [body('user_id').notEmpty().withMessage('role_id required').custom(isUserExist)];
};

module.exports = userValidator;
