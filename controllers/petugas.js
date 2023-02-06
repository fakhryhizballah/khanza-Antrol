const { dokter, petugas, jabatan, pasien, kelurahan, kecamatan, kabupaten, penjab } = require('../models');
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
                attributes: ['no_rkm_medis', 'nm_pasien', 'tgl_lahir', 'jk'],
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

    },
    getDetailPasien: async (req, res) => {
        try {
            // get id from url
            const { id } = req.params;
            let dataPasien = await pasien.findOne({
                attributes: { exclude: ['kd_kel', 'kd_kec', 'kd_kab'] },
                where: {
                    no_rkm_medis: id
                },
                include: [{
                    model: kelurahan,
                    as: 'kelurahan',
                    attributes: ['nm_kel'],
                }, {
                    model: kecamatan,
                    as: 'kecamatan',
                    attributes: ['nm_kec'],
                }, {
                    model: kabupaten,
                    as: 'kabupaten/kota',
                    attributes: ['nm_kab'],
                }, {
                    model: penjab,
                    attributes: ['png_jawab'],
                }]
            });
            if (!dataPasien) {
                return res.status(404).json({
                    status: false,
                    message: 'Data pasien tidak ditemukan',
                    data: {
                        no_rkm_medis: id
                    },
                });
            }
            var data = {
                no_rkm_medis: dataPasien.no_rkm_medis,
                nm_pasien: dataPasien.nm_pasien,
                jk: dataPasien.jk,
                tgl_lahir: dataPasien.tgl_lahir,
                alamat: dataPasien.alamat,
                kelurahan: dataPasien.kelurahan.nm_kel,
                kecamatan: dataPasien.kecamatan.nm_kec,
                kabupaten: dataPasien['kabupaten/kota'].nm_kab,
                no_tlp: dataPasien.no_tlp,
                pekerjaan: dataPasien.pekerjaan,
                agama: dataPasien.agama,
                nm_ibu: dataPasien.nm_ibu,
                asuransi: dataPasien.penjab.png_jawab,
                no_peserta: dataPasien.no_peserta,
            };
            return res.status(200).json({
                status: false,
                message: 'Data pasien',
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
};