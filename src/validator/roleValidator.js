const { body } = require('express-validator');
const Role = require('../schema/roleSchema');

// const isRoleAlreadyRegistered = async (title) => {
//     const role = await Role.findOne({title});
//     if(role) {
//         return Promise.reject('title is already registered');
//     }
// };

const roleValidator = () => {
return [
    body('title').notEmpty()
]
}

module.exports = roleValidator;