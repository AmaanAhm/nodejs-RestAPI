const express = require('express');
const router = express.Router();


const registerRoutes = require('./register');


// Define route prefix for each route module
router.use('/api', registerRoutes);

module.exports = router;