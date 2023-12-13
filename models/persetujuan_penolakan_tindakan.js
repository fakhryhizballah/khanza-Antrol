persetujuan_penolakan_tindakan
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class persetujuan_penolakan_tindakan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            persetujuan_penolakan_tindakan.hasOne(models.petugas, {
                foreignKey: 'nip',
                sourceKey: 'nip',
                as: 'petugas'
            });
            persetujuan_penolakan_tindakan.hasOne(models.reg_periksa, {
                foreignKey: 'no_rawat',
                sourceKey: 'no_rawat',
                as: 'reg_periksa'
            });

        }

    }
    persetujuan_penolakan_tindakan.init({
        no_surat: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        no_rawat: DataTypes.STRING,
        tanggal: DataTypes.DATE,
        diagnosa: DataTypes.STRING,
        diagnosa_konfirmasi: DataTypes.enum('true', 'false'),
        tindakan: DataTypes.STRING,
        tindakan_konfirmasi: DataTypes.enum('true', 'false'),
        indikasi_tindakan: DataTypes.STRING,
        indikasi_tindakan_konfirmasi: DataTypes.enum('true', 'false'),
        tata_cara: DataTypes.STRING,
        tata_cara_konfirmasi: DataTypes.enum('true', 'false'),
        tujuan: DataTypes.STRING,
        tujuan_konfirmasi: DataTypes.enum('true', 'false'),
        risiko: DataTypes.STRING,
        risiko_konfirmasi: DataTypes.enum('true', 'false'),
        komplikasi: DataTypes.STRING,
        komplikasi_konfirmasi: DataTypes.enum('true', 'false'),
        prognosis: DataTypes.STRING,
        prognosis_konfirmasi: DataTypes.enum('true', 'false'),
        alternatif_dan_risikonya: DataTypes.STRING,
        alternatif_konfirmasi: DataTypes.enum('true', 'false'),
        biaya: DataTypes.DOUBLE,
        biaya_konfirmasi: DataTypes.enum('true', 'false'),
        lain_lain: DataTypes.STRING,
        lain_lain_konfirmasi: DataTypes.enum('true', 'false'),
        kd_dokter: DataTypes.STRING,
        nip: DataTypes.STRING,
        penerima_informasi: DataTypes.STRING,
        alasan_diwakilkan_penerima_informasi: DataTypes.STRING,
        jk_penerima_informasi: DataTypes.enum('L', 'P'),
        tanggal_lahir_penerima_informasi: DataTypes.DATE,
        umur_penerima_informasi: DataTypes.STRING,
        alamat_penerima_informasi: DataTypes.STRING,
        no_hp: DataTypes.STRING,
        hubungan_penerima_informasi: DataTypes.enum('Diri Sendiri', 'Orang Tua', 'Anak', 'Saudara Kandung', 'Teman', 'Lain-lain'),
        pernyataan: DataTypes.enum('Belum Dikonfirmasi', 'Persetujuan', 'Penolakan'),
        saksi_keluarga: DataTypes.STRING,

        // createdAt: { type: DataTypes.DATE, field: 'created_at' },
        // updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        // If don't want createdAt
    }, {
        sequelize,
        modelName: 'persetujuan_penolakan_tindakan',
        tableName: 'persetujuan_penolakan_tindakan',
        timestamps: false,
        createdAt: false,
        updatedAt: false,



    });
    return surat_persetujuan_umum;
};