'use strict';
const { Route } = require("express");
const express = require("express");
const routes = express.Router();

const ralan = require('../controllers/ralan');


routes.get('/igd', ralan.getIGD);
routes.get('/poli', ralan.getPoli);
routes.get('/poli/:kd_poli', ralan.getPoliByKdPoli);

module.exports = routes;