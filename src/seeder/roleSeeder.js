const mongoose = require('mongoose');
const roleSchema = require('../schema/roleSchema');


require('dotenv').config();
require('../core/db_conn').connect();
const titles = ['Super Admin', 'Admin', 'Guest'];
const Role = mongoose.model('Role', roleSchema);

async function seed() {
    await Role.deleteMany({});
  const roles = titles.map((title) => {
    return { title: title };
  });
  await Role.insertMany(roles);
  console.log('Roles seeded successfully');
  return true;
}

module.exports = { seed };
