'use strict';
const express = require("express");
const routes = express.Router();

const ranap = require('../controllers/ranap');


routes.get('/bp', ranap.getBp);
routes.get('/tm', ranap.getTglMasuk);
routes.get('/kamar', ranap.getKamar);

module.exports = routes;