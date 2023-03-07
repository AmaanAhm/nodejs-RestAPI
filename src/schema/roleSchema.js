const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
    },
});

module.exports = roleSchema;
