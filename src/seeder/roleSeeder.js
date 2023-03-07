const mongoose = require('mongoose');
const connectDb = require('../core/db_conn');
const roleSchema = require('../schema/roleSchema');

connectDb();

const titles = ['Super Admin', 'Admin'];
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
