'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const routes = require('./routes/ranap');
const routesicd = require('./routes/icd');
const routespetugas = require('./routes/petugas');
const routeralan  = require('./routes/ralan');
const routepenunjang  = require('./routes/penunjang');
app.use('/api/ranap', routes);
app.use('/api/ralan', routeralan);
app.use('/api/icd', routesicd);
app.use('/api/petugas', routespetugas);
app.use('/api/penunjang', routepenunjang);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('running on port', PORT);
});