const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const axios = require('axios');

const path = require('path');

const routes = require('./routes');
const { USER_ERROR, asyncMiddleware, errorHandler, frontServerIP, clientID } = require('./util');

const PORT = process.env.PORT || '3001';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const obj = {};

routes(app);

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('Running in ' + (process.env.PRODUCTION ? 'Production' : 'Development'));
});

module.exports = app;
