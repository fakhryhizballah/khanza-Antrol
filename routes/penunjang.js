'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');

const penunjang = require('../controllers/penunjang');

// routes.get('/jnsLab',middleware.check, penunjang.getTempLab);
routes.get('/jnsLab',middleware.check, penunjang.getTempLab);
routes.get('/jnsRad',middleware.check, penunjang.getTempRad);
routes.get('/jnsLab/:id',middleware.check, penunjang.getTempLabDetail);


module.exports = routes;