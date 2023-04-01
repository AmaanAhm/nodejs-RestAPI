var mongoose = require('mongoose')
var permissionSchema = require('../schema/permissionSchema');


var Permission = mongoose.model('Permission', permissionSchema)

module.exports = Permission;    
    