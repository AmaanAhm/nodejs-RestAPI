// const mongoose = require("mongoose");

// const { MONGO_URI } = process.env;
// const connect = () => {
//   // Connecting to the database

//   if (!process.env.MONGO_URI) {
//     throw new Error("MONGO_URI not set in environment variables.");
//   }
//   mongoose
//     .connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,

//     })
//     .then(() => {
//       console.log("Successfully connected to database");
//     })
//     .catch((error) => {
//       console.log("database connection failed. exiting now...");
//       console.error(error);
//       process.exit(1);
//     });
// };

// module.exports = {connect}


const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = { connect };
