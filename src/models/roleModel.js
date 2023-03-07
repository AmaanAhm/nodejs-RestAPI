var mongoose  = require('mongoose');
var roleSchema = require('../schema/roleSchema');

const Role = mongoose.model('Role', roleSchema);

exports.default = Role;
