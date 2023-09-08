'use strict';
const { reg_periksa, pasien, dokter, poliklinik, jadwal } = require('../models');
const { Op } = require("sequelize");
module.exports = {
    getIGD: async (req, res) => {
        try {
            const param = req.query;
            let dataIGD = await reg_periksa.findAll({
                attributes: ['no_rawat', 'tgl_registrasi', 'jam_reg', 'kd_dokter'],
                where: {
                    kd_poli: 'IGDK',
                    status_lanjut: 'Ralan',
                    tgl_registrasi: { [Op.between]: [param.from, param.until] },
                },
                include: [{
                    model: pasien,
                    as: 'pasien',
                    attributes: ['no_rkm_medis', 'nm_pasien', 'jk', 'tgl_lahir']
                },
                {
                    model: dokter,
                    as: 'dokter',
                    attributes: ['nm_dokter']
                }],
            });
            return res.status(200).json({
                status: true,
                message: 'Data ranap',
                record: dataIGD.length,
                data: dataIGD,
                queryParam: param,
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
        }

    },
    getPoli: async (req, res) => {
        try {
            let dataPoliklinik = await poliklinik.findAll({
                attributes: ['kd_poli', 'nm_poli'],
            });
            return res.status(200).json({
                status: true,
                message: 'Data poliklinik',
                record: dataPoliklinik.length,
                data: dataPoliklinik,
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });

        }
    },
    getPoliByKdPoli: async (req, res) => {
        try {
            let dataPoliklinik = await reg_periksa.findAll({
                attributes: ['no_rawat', 'tgl_registrasi', 'jam_reg', 'kd_dokter'],
                where: {
                    kd_poli: req.params.kd_poli,
                    status_lanjut: 'Ralan',
                    tgl_registrasi: { [Op.between]: [req.query.from, req.query.until] },
                },
                include: [{
                    model: pasien,
                    as: 'pasien',
                    attributes: ['no_rkm_medis', 'nm_pasien', 'jk', 'tgl_lahir']
                },
                {
                    model: dokter,
                    as: 'dokter',
                    attributes: ['nm_dokter']
                }],
            });
            return res.status(200).json({
                status: true,
                message: 'Data ranap',
                record: dataPoliklinik.length,
                data: dataPoliklinik,
            });
            
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err
            });
            
        }
    },
    getJadwalPoli: async (req, res) => {
        try {
            let query = req.query;
            // console.log(query);
            let dataJadwal = await jadwal.findAll({
                attributes: ['kd_dokter', 'hari_kerja', 'jam_mulai', 'jam_selesai', 'kd_poli', 'kuota'],
                where: {
                    kd_poli: query.kd_poli,
                },
                include: [{
                    model: dokter,
                    as: 'dokter',
                    attributes: ['nm_dokter']
                }],
            });
            // group by hari_kerja
            let dataJadwalGroup = [];
            dataJadwal.forEach((item) => {
                let index = dataJadwalGroup.findIndex((x) => x.hari_kerja === item.hari_kerja);
                if (index === -1) {
                    dataJadwalGroup.push({
                        hari_kerja: item.hari_kerja,
                        data: [item],
                    });
                } else {
                    dataJadwalGroup[index].data.push(item);
                }
            });

            return res.status(200).json({
                status: true,
                message: 'Data jadwal',
                record: dataJadwal.length,
                data: dataJadwalGroup,
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                data: err.message
            });

        }
    }

}