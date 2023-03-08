const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = roleSchema;
