'use strict';
const { reg_periksa, pasien, kamar_inap, kamar } = require('../models');
const { Op } = require("sequelize");
module.exports = {
    getRanap: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 10;
            }
            let dataReg = await kamar_inap.findAll({
                where: {
                    [Op.and]: [
                        { tgl_keluar: '0000-00-00' },
                        { no_rawat: { [Op.substring]: param.no_rawat } }
                    ]
                },
                attributes: ['no_rawat', 'tgl_masuk', 'jam_masuk', 'kd_kamar'],
                include: [
                    {
                        model: reg_periksa,
                        as: 'reg_periksa',
                        attributes: ['no_rkm_medis'],

                        include: [
                            {
                                model: pasien,
                                as: 'pasien',
                                // where: {
                                //     no_rkm_medis: {[Op.not]: true}
                                // },
                                attributes: ['nm_pasien', 'jk', 'tgl_lahir',],

                            },
                        ],
                    },
                ],
                limit: parseInt(param.limit),
            });
            return res.status(200).json({
                status: true,
                message: 'Data ranap',
                recoud: dataReg.length,
                data: dataReg
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
            let dataKamar = await kamar.findAll({
                group: 'kd_bangsal' ,
                attributes: ['kd_bangsal', 'kelas'],
                limit: 10,
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

}