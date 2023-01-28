'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const routes = require('./routes/ranap');
const routesicd = require('./routes/icd');
app.use('/api/ranap', routes);
app.use('/api/icd', routesicd);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('running on port', PORT);
});