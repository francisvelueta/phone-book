require('./enviroment')(process.env.NODE.ENV);
const express = require('express');
require('express-async-errors');
const app = express();

// Add MongoDB connection
require('./helpers/db')();

require('./helpers/pipeline')(app);
module.exports = app;
