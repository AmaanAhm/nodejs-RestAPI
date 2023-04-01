const express = require('express');
const router = express.Router();

const registerRoute = require('./register');
const roleRoute = require('./roleRoute');
const loginRoute = require('./loginRoute');
const permissionRoute = require('./permissionRoute')
const userRoute  = require('./userRoute')

// Define route prefix for each route module
router.use('/api', registerRoute);
router.use('/api', roleRoute);
router.use('/api', loginRoute);
router.use('/api', permissionRoute);
router.use('/api', userRoute);



module.exports = router;
