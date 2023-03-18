const User = require('../models/UserModel');
const bcrypt = require('bcrypt');


const register = async (request, response) => {

    try {
        // Request body is valid, continue with registration process
        const { first_name, last_name, email, phone_number, password, role_id } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ first_name, last_name, email, phone_number, password: hashedPassword, role_id });
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

const updateUser = async (request, response) => {
    try {
        const userId = request.params.id;
        const { first_name, last_name, phone_number } = request.body;

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        user.first_name = first_name;
        user.last_name = last_name;
        user.phone_number = phone_number;

        const updatedUser = await user.save();
        response.json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register, updateUser };