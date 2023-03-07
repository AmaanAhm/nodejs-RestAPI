const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const multer = require('multer');
const connectDb = require('../src/core/db_conn')
const upload = multer()
const routes = require('./routes');
connectDb()


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(upload.array())

app.use(routes);

app.listen(3000, (request, response) => {
    console.log("port 5000")
})
