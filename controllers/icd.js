'use strict';
const { icd10,icd9 } = require('../models');
const { Op } = require("sequelize");
module.exports = {
geticd10: async (req, res) => {
    try{
        const param = req.query;
        if (!param.limit) {
            param.limit = 10;
        }
        if (!param.search) {
            return res.status(422).json({
                status: false,
                message: 'Search is required in params',
                data: null
            });
            
        }
        const data = await icd10.findAll({
            where: {
                [Op.or]: [
                    { kd_penyakit: { [Op.like]: `%${param.search}%` } },
                    { nm_penyakit: { [Op.like]: `%${param.search}%` } },
                    { ciri_ciri: { [Op.like]: `%${param.search}%` } }
                ]
            },
            //toINT: parseInt(param.limit),
            limit: parseInt(param.limit), 
        });
      
        return res.status(200).json({
            status: true,
            message: 'Data icd10',
            data: data
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
    getdetailICD10: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await icd10.findOne({
                where: {
                    kd_penyakit: id
                }
            });
            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: 'Data not found',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Data icd10',
                data: data
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
  geticd9: async (req, res) => {
    try{
        const param = req.query;
        if (!param.limit) {
            param.limit = 10;
        }
        if (!param.search) {
            return res.status(422).json({
                status: false,
                message: 'Search is required in params',
                data: null
            });
            
        }
        const data = await icd9.findAll({
            where: {
                [Op.or]: [
                    { kode: { [Op.like]: `%${param.search}%` } },
                    { deskripsi_pendek: { [Op.like]: `%${param.search}%` } },
                    { deskripsi_panjang: { [Op.like]: `%${param.search}%` } }
                ]
            },
            //toINT: parseInt(param.limit),
            limit: parseInt(param.limit), 
        });
      
        return res.status(200).json({
            status: true,
            message: 'Data icd9',
            data: data
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
    getdetailICD9: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await icd9.findOne({
                where: {
                    kode: id
                }
            });
            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: 'Data not found',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Data icd9',
                data: data
            }
            );
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
        }
  }
};
