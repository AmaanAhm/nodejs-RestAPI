const User = require('../models/UserModel');
const bcrypt = require('bcrypt');


const register = async (request, response) => {

    try {
        // Request body is valid, continue with registration process
        const { first_name, last_name, email, phone_number, password } = request.body;
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
