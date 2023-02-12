'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');
const ranap = require('../controllers/ranap');


routes.get('/bp',middleware.check, ranap.getBp);
routes.get('/tm',middleware.check, ranap.getTglMasuk);
routes.get('/kamar',middleware.check, ranap.getKamar);

module.exports = routes;