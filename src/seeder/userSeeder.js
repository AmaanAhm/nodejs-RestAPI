const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const connectDb = require("../core/db_conn");
const userSchema = require("../schema/userSchema");

connectDb()


const User = mongoose.model("User", userSchema);

for (let i = 0; i < 10; i++) {
  const user = new User({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number('##########'),
  });
  user.save();
}

return true;
