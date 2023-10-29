'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');

const dashboard = require('../controllers/dashboard');

// routes.get('/regpoli/daily', middleware.check, dashboard.poliHarian);
routes.get('/regpoli/day', middleware.check, dashboard.poliHarian);

module.exports = routes;