const { dokter, petugas, jabatan, pasien } = require('../models');
const { Op } = require("sequelize");
module.exports = {
    getDokter: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 10;
            }
            if (!param.search) {
                param.search = '';
            }
            let data = await dokter.findAll({

                where: {
                    [Op.or]: [
                        { kd_dokter: { [Op.substring]: param.search } },
                        { nm_dokter: { [Op.substring]: param.search } },
                    ]
                },
                limit: parseInt(param.limit)
            });

            return res.status(200).json({
                status: true,
                message: 'Data ranap',
                recoud: data.length,
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error,
            });
        }

    },
    getPerawat: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 10;
            }
            if (!param.search) {
                param.search = '';
            }
            var data = await petugas.findAll({
                attributes: ['nip', 'nama', 'jk'],
                where: {
                    [Op.or]: [
                        { nip: { [Op.substring]: param.search } },
                        { nama: { [Op.substring]: param.search } },
                    ]
                },
                include: [{
                    model: jabatan,
                    as: 'jabatan',
                    attributes: ['nm_jbtn'],
                }],
                limit: parseInt(param.limit)
            });
            data = data.map((item) => {
                return {
                    nip: item.nip,
                    nama: item.nama,
                    jk: item.jk,
                    jabatan: item.jabatan.nm_jbtn,
                }
            });
            return res.status(200).json({
                status: true,
                message: 'Data ranap',
                recoud: data.length,
                data: data,
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error,
            });
        }

    },
    getPasien: async (req, res) => {
        try {
            const param = req.query;
            if (!param.limit) {
                param.limit = 10;
            }
            if (param.limit > 100) {
                param.limit = 100;
            }
            if (!param.search) {
                param.search = '';
            }
            let data = await pasien.findAll({
                where: {
                    [Op.or]: [
                        { nm_pasien: { [Op.substring]: param.search } },
                        { tgl_lahir: { [Op.substring]: param.search } },
                        { no_rkm_medis: { [Op.substring]: param.search } },
                    ]
                },
                limit: parseInt(param.limit)
            });

            return res.status(200).json({
                status: true,
                message: 'Data ranap',
                recoud: data.length,
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error,
            });
        }

    }
};