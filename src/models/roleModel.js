var mongoose  = require('mongoose');
var roleSchema = require('../schema/roleSchema');


var Role = mongoose.model('Role', roleSchema);

module.exports = Role;
