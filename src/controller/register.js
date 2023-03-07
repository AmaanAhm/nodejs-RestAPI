const User = require("../models/UserModel");

const register = async (request, response) => {
  // response.status(200).send({
  //     'message':'success'
  // })

  // try {
    console.log(request.body);
  const { first_name, last_name, email, phone_number } = request.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return response.status(409).json({
      message: "User with the provided email already exists",
    });
  }

  // Create a new user object
  const newUser = new User({ first_name, last_name, email, phone_number });

  // Save the new user to the database
  const savedUser = await newUser.save();

  response.status(201).json({
    message: "User registered successfully",
    user: savedUser,
  });
  //   } catch (error) {
  //     console.error(error);
  //     response.status(500).json({ message: 'Internal server error' });
  //   }
};

module.exports = {
  register,
};
