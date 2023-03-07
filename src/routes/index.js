const express = require('express');
const router = express.Router();


const registerRoutes = require('./register');

const roleRoute = require('./roleRoute');
// Define route prefix for each route module
router.use('/api', registerRoutes);
router.use('/api', roleRoute)

module.exports = router;