const { body } = require('express-validator');
const User = require('../models/UserModel');

const isEmailAlreadyRegistered = async (email, role) => {
  const userByEmail = await User.findOne({ email });
  
  if (userByEmail) {
    return Promise.reject(`Email '${email}' is already registered`);
  }
  
}




// const isPhoneAlreadyRegistered = async (phone_number) => {
//   const userByPhone = await User.findOne({ phone_number });
  
//   if (userByPhone) {
//     return Promise.reject(`Phone number '${phone_number}' is already registered`);
//   }
  
//   return Promise.resolve();
// }


const registerValidator = () => {
  return [
    body('email').isEmail().withMessage('Please provide a valid email').custom(isEmailAlreadyRegistered),
    body('first_name').notEmpty().withMessage('please proovide a first Name'),
    body('last_name').notEmpty().withMessage('please provide a last name'),
    body('password').notEmpty().withMessage('please provide password'),
    body('phone_number').notEmpty().withMessage('please provide phone number'),
    body('role').notEmpty().withMessage('please provide role')
  ]
};

module.exports = registerValidator;


