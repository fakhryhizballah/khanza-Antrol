"use strict";
const { reg_periksa, poliklinik } = require("../models");
const { Op } = require("sequelize");
const { query } = require("express");
module.exports = {
  poliHarian: async (req, res) => {
    try {
      const query = req.query;
      let data_reg = await reg_periksa.findAll({
        attributes: [
          "no_reg",
          "no_rawat",
          "tgl_registrasi",
          "kd_poli",
          "status_lanjut",
          "stts",
        ],
        where: {
          tgl_registrasi: query.tgl_registrasi,
          status_lanjut: "Ralan",
        },
        include: [
          {
            model: poliklinik,
            as: "poliklinik",
            attributes: ["nm_poli"],
          },
        ],
      });
      const counts = [];
      let allrecord = {
        sudah: 0,
        belum: 0,
        batal: 0,
        total: data_reg.length,
      };
      for (let i of data_reg) {
        if (i.stts === "Sudah") {
          allrecord.sudah++;
        }
        if (i.stts === "Belum") {
          allrecord.belum++;
        }
        if (i.stts === "Batal") {
          allrecord.batal++;
        }
        const kd_poli = i.kd_poli;
        const poliklinikName = i.poliklinik.nm_poli;
        const status = i.stts;
        // Cari apakah sudah ada entri untuk kd_poli ini
        const existingEntry = counts.find((item) => item.kd_poli === kd_poli);

        if (existingEntry) {
          // Jika sudah ada, tambahkan jumlah poliklinik dan status
          existingEntry.poli_reg++;
          if (status === "Sudah") {
            existingEntry.status.Sudah++;
          }
          if (status === "Belum") {
            existingEntry.status.Belum++;
          }
          if (status === "Batal") {
            existingEntry.status.Batal++;
          }
        } else {
          // Jika belum ada, buat entri baru
          let action = {};
          if (status === "Sudah") {
            action = {
              Sudah: 1,
              Belum: 0,
              Batal: 0,
            };
          }
          if (status === "Belum") {
            action = {
              Sudah: 0,
              Belum: 1,
              Batal: 0,
            };
          }
          if (status === "Batal") {
            action = {
              Sudah: 0,
              Belum: 0,
              Batal: 1,
            };
          }
          const newEntry = {
            kd_poli,
            poliklinik: poliklinikName,
            poli_reg: 1,
            status: action,
          };
          counts.push(newEntry);
        }
      }
      return res.status(200).json({
        status: true,
        message: "poliHarian",
        record: counts.length,
        data: {
          allrecord: allrecord,
          poliklinik: counts,
        },
        // data: data_reg
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        data: err,
      });
    }
  },
  getKunjungan: async (req, res) => {
    try {
      const param = req.query;
      let data_reg = await reg_periksa.findAll({
        attributes: [
          "kd_poli",
        ],
        where: {
          tgl_registrasi: { [Op.between]: [param.from, param.until] },
          status_lanjut: "Ralan",
          stts: { [Op.ne]: "Batal" },
        },
        include: [
          {
            model: poliklinik,
            as: "poliklinik",
            attributes: ["nm_poli"],
          },
        ],
      });
      const counts = [];
      for (let i of data_reg) {
        const kd_poli = i.kd_poli;
        const poliklinikName = i.poliklinik.nm_poli;
        // Cari apakah sudah ada entri untuk kd_poli ini
        const existingEntry = counts.find((item) => item.kd_poli === kd_poli);
        if (existingEntry) {
          // Jika sudah ada, tambahkan jumlah poliklinik dan status
          existingEntry.totalKunjungan++;
        } else {
          // Jika belum ada, buat entri baru
          const newEntry = {
            kd_poli,
            poliklinik: poliklinikName,
            totalKunjungan: 1,
          };
          counts.push(newEntry);
        }
      }
      return res.status(200).json({
        status: true,
        message: "poliHarian",
        record: counts.length,
        data: {
            allrecord: data_reg.length,
            poliklinik: counts,
          },
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        data: err,
      });
    }
  },
  getpenyakit: async (req, res) => {
    try {
      const param = req.query;
      return res.status(200).json({
        status: true,
        message: "Reg Penyakit ralan",
        record: 0,
        data: param,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        data: err,
      });
    }
  },
  test: async (req, res) => {
    try {
      const param = req.query;
      return res.status(200).json({
        status: true,
        message: "poliHarian",
        record: 0,
        data: param,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        data: err,
      });
    }
  },
};
