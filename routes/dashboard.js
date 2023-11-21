'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware/dasboard');

const dashboard = require('../controllers/dashboard');

routes.get('/regpoli/daily', middleware.dashboard, dashboard.poliHarian);
routes.get('/reg/reports/:id', middleware.dashboard, dashboard.getKunjungan);
routes.get('/reg/asuransi/:id', middleware.dashboard, dashboard.getAsuransi);
routes.get('/regranap/belumpulang', middleware.dashboard, dashboard.getBelumPulang);
routes.get('/regranap/pulang', middleware.dashboard, dashboard.getPulang);
routes.get('/regranap/kamar/inap', dashboard.getKamarInap);

module.exports = routes;