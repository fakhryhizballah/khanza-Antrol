'use strict';
const { icd10, icd9 } = require('../models');
const { Op } = require("sequelize");
module.exports = {
    poliHarian: async (req, res) => {
        try {
            const param = req.query;
            return res.status(200).json({
                status: true,
                message: 'poliHarian',
                record: 0,
                // data: param
            }
            );
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
        }

    },
    test: async (req, res) => {
        try {
            const param = req.query;
            return res.status(200).json({
                status: true,
                message: 'poliHarian',
                record: 0,
                data: param
            }
            );
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
        }

    },
}