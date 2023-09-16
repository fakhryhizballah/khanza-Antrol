'use strict';
const { jns_perawatan_lab,template_laboratorium,jns_perawatan_radiologi } = require('../models');
const { Op } = require("sequelize");
module.exports = {
    getTempLab: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 100;
            }
            if (param.limit > 100) {
                param.limit = 100;
            }
            const data = await jns_perawatan_lab.findAll({
                where: {
                    status: '1',
                    [Op.or]: [
                        { kd_jenis_prw: { [Op.like]: `%${param.search}%` } },
                        { nm_perawatan: { [Op.like]: `%${param.search}%` } },
                    ]
                },
                //toINT: parseInt(param.limit),
                limit: parseInt(param.limit),
                attributes: ['kd_jenis_prw', 'nm_perawatan', 'kategori', 'kelas', 'total_byr'],
            });
            return res.status(200).json({
                status: true,
                message: 'Data Kategori laboratorium',
                record: data.length,
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
    getTempLabDetail: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await template_laboratorium.findAll({
                where: {
                    kd_jenis_prw: id
                },
                // attributes:{exclude: ['urut']}
                // attributes: ['kd_jenis_prw', 'Pemeriksaan', 'biaya_item', 'urut']
                order: [
                    ['urut', 'ASC']
                ]
            });
            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: 'Data tidak ditemukan',
                    data: {
                        kd_jenis_prw: id
                    }
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Data detail laboratorium',
                data: data
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
        }
    },
    getCariLab: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 100;
            }
            if (param.limit > 100) {
                param.limit = 100;
            }
            const data = await jns_perawatan_lab.findAll({
                where: {
                    status: '1',
                },
                include: [
                    {
                        model: template_laboratorium,
                        as: 'template_laboratorium',
                        where: {
                            [Op.or]: [
                                { kd_jenis_prw: { [Op.like]: `%${param.search}%` } },
                                { Pemeriksaan: { [Op.like]: `%${param.search}%` } },
                            ]
                        },
                        attributes: ['kd_jenis_prw', 'Pemeriksaan', 'biaya_item', 'urut']
                    }
                ],
                //toINT: parseInt(param.limit),
                limit: parseInt(param.limit),
                // attributes: ['kd_jenis_prw', 'Pemeriksaan', 'biaya_item', 'urut']
            });
            return res.status(200).json({
                status: true,
                message: 'Data laboratorium',
                record: data.length,
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
    getTempRad: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 100;
            }
            if (param.limit > 100) {
                param.limit = 100;
            }
            const data = await jns_perawatan_radiologi.findAll({
                where: {
                    status: '1',
                    [Op.or]: [
                        { kd_jenis_prw: { [Op.like]: `%${param.search}%` } },
                        { nm_perawatan: { [Op.like]: `%${param.search}%` } },
                    ]
                },
                //toINT: parseInt(param.limit),
                limit: parseInt(param.limit),
                attributes: ['kd_jenis_prw', 'nm_perawatan'],
            });
            return res.status(200).json({
                status: true,
                message: 'Data radiologi',
                record: data.length,
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

};