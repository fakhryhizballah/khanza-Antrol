'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');

const penunjang = require('../controllers/penunjang');

routes.get('/cariLab', middleware.check, penunjang.getCariLab);
routes.get('/jnsLab', middleware.check, penunjang.getTempLab);
routes.get('/jnsLab/:id',middleware.check, penunjang.getTempLabDetail);
routes.get('/jnsRad', middleware.check, penunjang.getTempRad);
routes.get('/tariftind', middleware.check, penunjang.getTarifTind);


module.exports = routes;