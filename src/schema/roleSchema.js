const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    title: {
        type: String, // use the String constructor instead of 'string'
        required: true,
        trim: true,
        unique: true,
    },
});

module.exports = roleSchema;
