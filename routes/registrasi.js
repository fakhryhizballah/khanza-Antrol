'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');
const registrasi = require('../controllers/registrasi');


// routes.post('/bookingperiksa', middleware.check, registrasi.bookingPeriksa);
routes.post('/bookingperiksa', registrasi.bookingPeriksa);
routes.get('/bookingperiksa', registrasi.cekBookingPeriksa);
routes.post('/bookingperiksa/batal', registrasi.batalBookingPeriksa);
routes.post('/bookingperiksa/cekin', registrasi.cekinBookingPeriksa);


module.exports = routes;