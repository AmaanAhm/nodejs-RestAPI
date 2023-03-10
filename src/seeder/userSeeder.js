const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const connectDb = require('../core/db_conn');
const userSchema = require('../schema/userSchema');

connectDb();

const User = mongoose.model('User', userSchema);
async function seed() {
  await User.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const user = new User({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone_number: faker.phone.number('##########'),
      password: 'Qwerty@123',
    });
    await user.save();
  }

  console.log('Users seeded successfully');
  return true;
}

module.exports = { seed };
