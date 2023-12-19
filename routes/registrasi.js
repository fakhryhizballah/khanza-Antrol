'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');
const registrasi = require('../controllers/registrasi');


routes.get('/bpjs/suratkontrol',middleware.check, registrasi.suratkontrol);

module.exports = routes;