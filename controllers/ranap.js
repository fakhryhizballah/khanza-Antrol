'use strict';
const { reg_periksa, pasien, kamar_inap, kamar, bangsal } = require('../models');
const { Op } = require("sequelize");
module.exports = {
    getRanap: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 10;
            }
            // let dataReg = await kamar_inap.findAll({
            //     where: {
            //         [Op.and]: [
            //             { tgl_keluar: '0000-00-00' },
            //             { no_rawat: { [Op.substring]: param.no_rawat } }
            //         ]
            //     },
            //     attributes: ['no_rawat', 'tgl_masuk', 'jam_masuk', 'kd_kamar'],
            //     include: [
            //         {
            //             model: reg_periksa,
            //             as: 'reg_periksa',
            //             attributes: ['no_rkm_medis'],
            //             // where: {
            //             //     no_rkm_medis: { [Op.substring]: param.no_rkm_medis },
            //             //     // [Op.substring]: param.search,
            //             // },
            //             include: [
            //                 {
            //                     model: pasien,
            //                     as: 'pasien',
            //                     attributes: ['nm_pasien', 'jk', 'tgl_lahir',],

            //                 },
            //             ],
            //         },
            //     ],
            //     limit: parseInt(param.limit)
            // });
            // let count = await kamar_inap.count({
            //     where: {
            //         [Op.and]: [
            //             { tgl_keluar: '0000-00-00' },
            //             // { no_rawat: { [Op.substring]: param.no_rawat } }
            //         ]
            //     },
            // });
            let reg = await reg_periksa.findAll({

                attributes: ['no_rawat', 'no_rkm_medis'],
                where: {
                    [Op.and]: [
                        { status_lanjut: 'Ranap' },
                        {
                            [Op.or]: [
                                { no_rawat: { [Op.substring]: param.search } },
                                { no_rkm_medis: { [Op.substring]: param.search } },
                                { '$pasien.nm_pasien$': { [Op.substring]: param.search } },
                            ]
                        },

                    ],


                    // pasien: { [Op.substring]: param.no_rkm_medis },
                    // model: pasien,
                    // where: { nm_pasien: { [Op.substring]: param.nm_pasien } },
                },
                // [Op.substring]: param.search,

                include: [
                    {
                        model: pasien,
                        as: 'pasien',
                        attributes: ['nm_pasien', 'jk', 'tgl_lahir',],
                    },
                    {
                        model: kamar_inap,
                        as: 'kamar_inap',
                        attributes: ['tgl_masuk', 'jam_masuk', 'kd_kamar'],
                        where: {
                            [Op.and]: [
                                { tgl_keluar: '0000-00-00' },
                            ]
                        },
                        include: [
                            {
                                model: kamar,
                                as: 'kamar',
                                attributes: ['kd_bangsal', 'kelas'],
                                // where: { kelas: { [Op.substring]: param.kelas } },
                                include: [
                                    {
                                        model: bangsal,
                                        attributes: ['nm_bangsal'],
                                        // where: { nm_bangsal: { [Op.substring]: param.nm_bangsal } },
                                    }
                                ]
                            },
                        ],
                    },

                ],
                limit: parseInt(param.limit),
                order: [
                    ['no_rawat', 'DESC']
                ],
            });
            return res.status(200).json({
                status: true,
                message: 'Data ranap',
                recoud: reg.length,
                // recoudall: count,
                // data: find,
                // data: dataReg,
                data: reg,
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
        }
    },
    getKamar: async (req, res) => {
        try {
            // let dataKamar = await kamar.findAll({
            //     // group: 'kd_bangsal',
            //     attributes: ['kd_kamar', 'kd_bangsal', 'kelas'],
            //     include: [
            //         {
            //             model: bangsal,
            //             attributes: ['nm_bangsal'],
            //         }
            //     ],

            //     // limit: 10,
            // });
            let dataKamar = await bangsal.findAll({
                // attributes: ['kd_bangsal', 'nm_bangsal'],
                // not attributes 
                attributes: { exclude: ['status'] },
                where: {

                    [Op.and]: [
                        { '$kamars.statusdata$': '1', },
                        { nm_bangsal: { [Op.substring]: req.query.nm_bangsal } },
                    ]
                },
                include: [
                    {
                        model: kamar,
                        attributes: { exclude: ['statusdata'] },
                    }
                ],
            });
            // skip kamars yang kosong
            dataKamar = dataKamar.filter((item) => {
                return item.kamars.length > 0;
            });
            return res.status(200).json({
                status: true,
                message: 'Data kamar',
                // recoud: dataKamar.length,
                data: dataKamar,
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
        }

    },
    getBangsal: async (req, res) => {
    }

}