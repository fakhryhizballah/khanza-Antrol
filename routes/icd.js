'use strict';
const express = require("express");
const routes = express.Router();

const icd = require('../controllers/icd');

routes.get('/10', icd.geticd10);
routes.get('/9', icd.geticd9);

module.exports = routes;