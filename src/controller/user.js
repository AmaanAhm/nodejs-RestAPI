const User = require("../models/userModel");

const register_user = async (req, res) => {
    try {
  
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
       
        
      });
  
      const userData = await User.findOne({ email: req.body.email });
      if (userData) {
        res
          .status(200)
          .send({ success: false, msg: "This email already exists" });
      } else {
        const user_data = await user.save();
        res.status(200).send({ success: true, data: user_data });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  module.exports = 
  {
    register_user
  };