const express = require('express');
const routes = require('./routers');

const app = express();
routes(app);

module.exports = app;
