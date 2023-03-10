const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const multer = require('multer');
const connectDb = require('./src/core/db_conn')
const upload = multer()
const routes = require('./src/routes');
connectDb()


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(upload.array())
app.use(routes);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
  });

app.listen(3000, (request, response) => {
    console.log("port 3000")
})
