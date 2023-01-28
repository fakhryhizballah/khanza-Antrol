'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');

const icd = require('../controllers/icd');

routes.get('/10',middleware.check,middleware.checkDokter, icd.geticd10);
routes.get('/9', icd.geticd9);

module.exports = routes;