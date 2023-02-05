'use strict';
const express = require("express");
const routes = express.Router();

const petugas = require('../controllers/petugas');

routes.get('/dokter', petugas.getDokter);
routes.get('/perawat', petugas.getPerawat);
routes.get('/pasien', petugas.getPasien);


module.exports = routes;