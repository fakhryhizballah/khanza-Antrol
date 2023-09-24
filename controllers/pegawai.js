'use strict';
const { findUser, findUserPassword, updatedPasword, updateHakAses } = require('../helpers/user');
const { pegawai, petugas, dokter } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getUser: async (req, res) => {
        let nip = req.params.nip;
        let user = await findUser(nip);
        return res.status(200).json({
            status: true,
            message: 'Hak Akses User',
            data: user,
        });
    },
    getPassword: async (req, res) => {
        let nip = req.params.nip;
        let user = await findUserPassword(nip);
        return res.status(200).json({
            status: true,
            message: 'Password User',
            data: user,
        });
    },
    updatedPasword: async (req, res) => {
        let nip = req.params.nip;
        let { pass } = req.body;
        let user = await updatedPasword(nip, pass);
        return res.status(200).json({
            status: true,
            message: 'Password User',
            data: user,
        });
    },
    updateHakAses: async (req, res) => {
        let nip = req.params.nip;
        let { hak, state } = req.body;
        let user = await updateHakAses(nip, hak, state);
        return res.status(200).json({
            status: true,
            message: 'Hak Akses User',
            data: user,
        });
    },
    cariPegawai: async (req, res) => {
        let search = req.query.search;
        let limit = parseInt(req.query.limit) || 10;
        try {
            let data = await pegawai.findAll({
                where: {
                    [Op.or]: [{
                        nik: {
                            [Op.like]: '%' + search + '%'
                        }
                    },
                    {
                        nama: {
                            [Op.like]: '%' + search + '%'
                        }
                    },
                    {
                        no_ktp: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                },
                attributes: ['nik', 'nama', 'no_ktp', 'jk', 'jbtn', 'tmp_lahir', 'tgl_lahir', 'photo'],
                limit: limit
            });
            return res.status(200).json({
                status: true,
                message: 'Data Pegawai',
                record: data.length,
                data: data,
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error.message,
            });

        }
    },
    updateDataPegawai: async (req, res) => {
        let nik = req.params.nik;
        let { nama, no_ktp, jk, tmp_lahir, tgl_lahir } = req.body;
        if (!nama || !no_ktp || !jk || !tmp_lahir || !tgl_lahir) {
            return res.status(400).json({
                status: false,
                message: 'Data tidak lengkap',
                data: null,
            });
        }
        if (jk != 'Pria' && jk != 'Wanita') {
            return res.status(400).json({
                status: false,
                message: 'Jenis Kelamin tidak valid',
                data: "Jk: Pria atau Wanita",
            });
        }
        // validasi tanggal lahir
        let regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(tgl_lahir)) {
            return res.status(400).json({
                status: false,
                message: 'Format tanggal lahir tidak valid',
                data: "Format: YYYY-MM-DD",
            });
        }
        // if bulan lebih dari 12
        let splitDate = tgl_lahir.split('-');
        if (splitDate[1] > 12) {
            return res.status(400).json({
                status: false,
                message: 'Format tanggal lahir tidak valid YYYY-MM-DD',
                data: "bulan max 12 bulan ",
            });
        }
        // if tanggal lebih dari 31
        if (splitDate[2] > 31) {
            return res.status(400).json({
                status: false,
                message: 'Format tanggal lahir tidak valid YYYY-MM-DD',
                data: "bulan max 31 hari",
            });
        }

        regex = /^\d{16}$/;
        if (!regex.test(no_ktp)) {
            return res.status(400).json({
                status: false,
                message: 'Format Nomor KTP tidak valid',
                data: "Format: 16 digit angka",
            });
        }
        let JenisKelamin = (jk == 'Pria') ? 'L' : 'P';
        try {
            let data = await pegawai.update({
                nama: nama,
                no_ktp: no_ktp,
                jk: jk,
                tmp_lahir: tmp_lahir,
                tgl_lahir: tgl_lahir,
            }, {
                where: {
                    nik: nik,
                }
            });
            let p = await petugas.update({
                nama: nama,
                jk: JenisKelamin,
            }, {
                where: {
                    nip: nik,
                }
            });
            let d = await dokter.update({
                nm_dokter: nama,
                jk: JenisKelamin,
            }, {
                where: {
                    kd_dokter: nik,
                }
            });
            return res.status(200).json({
                status: true,
                message: 'Data Pegawai',
                data: {
                    pegawai: data,
                    petugas: p,
                    dokter: d,
                },
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error.message,
            });

        }
    }

}