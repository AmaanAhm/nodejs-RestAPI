const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const registerValidations = require('../validation/registerValidation');

const register = async (request, response) => {
    console.log(request.body);
    try {
        const errors = registerValidations(request);
        if (!errors.notEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
            });
        }

        // Request body is valid, continue with registration process
        const { first_name, last_name, email, phone_number, password } = request.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return response.status(409).json({
                message: 'User with the provided email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ first_name, last_name, email, phone_number, password: hashedPassword });
        const savedUser = await newUser.save();

        response.status(201).json({
            message: 'User registered successfully',
            user: savedUser,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register };
