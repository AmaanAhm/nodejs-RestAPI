const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const routes = require('./src/routes');
const { API_PORT } = process.env;
swaggerDocument = require('./swagger.json');


require('dotenv').config();
require('./src/core/db_conn').connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());
app.use(routes);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return;
});

const port = process.env.API_PORT || API_PORT;


var options = {
    explorer: true
  };

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument, options)
  );

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
