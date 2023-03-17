const { body } = require('express-validator');
const Role = require('../models/roleModel');

const isRoleAlreadyRegistered = async (title) => {
    const role = await Role.findOne({title});
    if(role) {
        return Promise.reject('title is already registered');
    }
};

const roleValidator = () => {
return [
    body('title').notEmpty().custom(isRoleAlreadyRegistered)
]
}

module.exports = roleValidator;