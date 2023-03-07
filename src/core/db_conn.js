const mongoose = require("mongoose");
const config = require("../config/database");

const url = config.mongoUrl;

const connectDb = async () => {

    await mongoose.connect(url).then(
        response => {
            console.info(`Connected to database`)
        },
        error => {
            console.error(`Connection error: ${error}`)
            process.exit(1)
        }
    )
}

module.exports = connectDb;