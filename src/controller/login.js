const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        // Check if email and password are present in the request body
        const { email, password } = req.body;
        console.log(req.body.email);
        console.log(req.body.password);


        if (!email || !password) {
          res.status(401).send({"message":"Provide email and password"})
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        res.status(200).json({
            message: 'User logged in successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { login };
