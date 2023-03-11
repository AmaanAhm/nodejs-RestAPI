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
        const token =  jwt.sign({ userId: user._id }, SECRET_KEY);
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


const verifyToken = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                
              return res.status(403).json({ message: 'Failed to authenticate token' });
            } else {
                res.status(200).json({ message: decoded });
              
            }
          });
    } else {
        return res.status(401).json({ message: 'Token not provided' });
    }
};

// Refresh Token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '15m' });
}

// Route handler for refreshing an access token using a refresh token
const refreshToken = async (req, res) => {
  // Get the refresh token from the request
  let refreshToken = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided' });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate refresh token' });
    }

    // Generate a new access token with a new expiration time
    const accessToken = generateAccessToken(decoded.userId);

    // Return the new access token
    res.status(200).json({ accessToken });
  });
}
  

module.exports = { login, verifyToken, refreshToken };



