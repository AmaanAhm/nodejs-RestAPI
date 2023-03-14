const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
          trim: true
        }
},    
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
},
)

module.exports = permissionSchema;