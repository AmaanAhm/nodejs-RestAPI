const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-key';

const login = async (req, res) => {
    try {
        // Check if email and password are present in the request body
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(401).send({ message: 'Provide email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid email or password',
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: '1h',
        });
        res.status(200).json({
            message: 'User logged in successfully',
            user,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//       return res.status(403).json({ message: 'Token not provided' });
//   }

//   try {
//       const decoded = jwt.verify(token, SECRET_KEY);
//       console.log(decoded);
//       req.userId = decoded.userId;
//       next();
//   } catch (err) {
//       return res.status(401).json({ message: 'Failed to authenticate token' });
//   }
// };

const verifyToken = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                // If an error occurs during verification, it will be passed as the first argument to the callback
                return res.status(403).json({ message: 'Failed to authenticate token' });
                // You may want to return an error response to the client here
            } else {
                // If the token is valid, the decoded payload will be passed as the second argument to the callback
                return res.status(200).json({ message: { decoded } });
                // You can now use the decoded payload as needed
            }
        });
    } else {
        return res.status(401).json({ message: 'Token not provided' });
    }
};

module.exports = { login, verifyToken };
