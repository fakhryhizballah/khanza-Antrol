'use strict';
const { reg_periksa, pasien, bridging_sep, bridging_surat_kontrol_bpjs, booking_registrasi} = require('../models');
const { Op } = require("sequelize");
module.exports = {
    suratkontrol: async (req, res) => {
        try {
            const { no_rkm_medis, tanggal_registrasi } = req.query;
            const data = await reg_periksa.findOne({
                where: {
                    no_rkm_medis,
                    tgl_registrasi: tanggal_registrasi,
                },
                include: [
                    {
                        model: pasien,
                        as: 'pasien',
                        attributes: ['no_ktp', 'nama_pasien', 'tgl_lahir', 'alamat', 'no_tlp', 'nm_ibu', 'pekerjaan', 'keluarga', 'namakeluarga', 'kd_pj', 'kd_kel', 'kd_kec', 'kd_kab', 'kd_prop'],
                    },
                    {
                        model: bridging_sep,
                        as: 'bridging_sep',
                        attributes: ['no_sep'],
                    },
                    {
                        model: booking_registrasi,
                        as: 'booking_registrasi',
                        attributes: ['tanggal_booking', 'jam_booking', 'tanggal_periksa', 'kd_dokter', 'kd_poli', 'no_reg', 'kd_pj', 'limit_reg', 'waktu_kunjungan', 'status'],
                    },
                ],
                attributes: ['no_rkm_medis', 'tgl_registrasi', 'no_rawat', 'kd_dokter', 'kd_poli', 'p_jawab', 'almt_pj', 'hubunganpj', 'biaya_reg', 'stts_daftar', 'kd_pj', 'no_reg', 'kd_pj', 'stts', 'status_lanjut', 'kd_poli', 'kd_dokter', 'kd_pj', 'no_rkm_medis', 'no_rkm_medis'],
            });
            res.json({
                status: 200,
                message: 'success',
                data,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: 'internal server error',
            });
        }
    },
};