'use strict';
const express = require("express");
const routes = express.Router();

const ranap = require('../controllers/ranap');

routes.get('/', ranap.getRanap);
routes.get('/bangsal', ranap.getBangsal);
routes.get('/kamar', ranap.getKamar);

module.exports = routes;