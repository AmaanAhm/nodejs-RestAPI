const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }, 
        role_id: {
            type: String,
            required: true, 
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
    },
);

module.exports = userSchema;
