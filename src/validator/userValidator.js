const User = require('../models/userModel');
const { body } = require('express-validator');
// const Role = require('../models/roleModel');

const isUserRoleIdExisted = async (role) => {
    const check = await User.findOne({ role });
    console.log(check);
    if (check) {
        return Promise.reject('Role_id is already registered');
    }
};
// this print this promise when "":"isalreadyExisted". problem
const userValidator = () => {
    return [body('role').notEmpty().withMessage('role_id required').custom(isUserRoleIdExisted)];
};

module.exports = userValidator;
