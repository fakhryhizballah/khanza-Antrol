const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

module.exports = {
    findUser: async (nip) => {
        let user = await sequelize.query("SELECT * FROM user WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip },
            type: QueryTypes.SELECT
        });
        return user[0];
    },
    findUserPassword: async (nip) => {
        let user = await sequelize.query("SELECT aes_decrypt(id_user,'nur') as user, aes_decrypt(password,'windi') as pass FROM user WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip },
            type: QueryTypes.SELECT
        });
        let data = {
            user: user[0].user.toString(),
            password: user[0].pass.toString()
        }
        return data;
    },
    updatedPasword: async (nip, pass) => {
        let user = await sequelize.query("UPDATE user SET password = AES_ENCRYPT(:pass,'windi') WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip, pass: pass },
            type: QueryTypes.UPDATE
        });
        return user;
    },
    updateHakAses: async (nip, hak, state) => {
        let user = await sequelize.query("UPDATE user SET " + hak + " = :state WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip, state: state },
            type: QueryTypes.UPDATE
        });
        return user;
    },
    // createUser: async (nip, pass, hak) => {
    //     let user = await sequelize.query("INSERT INTO user (id_user, password, penyakit, obat_penyakit, dokter, jadwal_praktek, petugas, pasien, registrasi, tindakan_ralan, kamar_inap, tindakan_ranap, operasi, rujukan_keluar, rujukan_masuk, beri_obat, resep_pulang, pasien_meninggal, diet_pasien, kelahiran_bayi, periksa_lab, periksa_radiologi, kasir_ralan, deposit_pasien, piutang_pasien, peminjaman_berkas, barcode, presensi_harian, presensi_bulanan, pegawai_admin, pegawai_user, suplier, satuan_barang, konversi_satuan, jenis_barang, obat, stok_opname_obat, stok_obat_pasien, pengadaan_obat, pemesanan_obat, penjualan_obat, piutang_obat, retur_ke_suplier, retur_dari_pembeli, retur_obat_ranap, retur_piutang_pasien, keuntungan_penjualan, keuntungan_beri_obat, sirkulasi_obat, ipsrs_barang, ipsrs_pengadaan_barang, ipsrs_stok_keluar, ipsrs_rekap_pengadaan, ipsrs_rekap_stok_keluar, ipsrs_pengeluaran_harian, inventaris_jenis, inventaris_kategori, inventaris_merk, inventaris_ruang, inventaris_produsen, inventaris_koleksi, inventaris_inventaris, inventaris_sirkulasi, parkir_jenis, parkir_in, parkir_out, parkir_rekap_harian, parkir_rekap_bulanan, informasi_kamar, harian_tindakan_poli, obat_per_poli, obat_per_kamar, obat_per_dokter_ralan, obat_per_dokter_ranap, harian_dokter, bulanan_dokter, harian_paramedis, bulanan_paramedis, pembayaran_ralan, pembayaran_ranap, rekap_pembayaran_ralan, rekap_pembayaran_ranap, tagihan_masuk, tambahan_biaya, potongan_biaya, resep_obat, resume_pasien, penyakit_ralan, penyakit_ranap, kamar, tarif_ralan, tarif_ranap, tarif_lab, tarif_radiologi, tarif_operasi, akun_rekening, rekening_tahun, posting_jurnal, buku_besar, cashflow, keuangan, pengeluaran, setup_pjlab, setup_otolokasi, setup_jam_kamin, setup_embalase, tracer_login, display, set_harga_obat, set_penggunaan_tarif, set_oto_ralan, biaya_harian, biaya_masuk_sekali, set_no_rm, billing_ralan, billing_ranap, jm_ranap_dokter, igd, barcoderalan, barcoderanap, set_harga_obat_ralan, set_harga_obat_ranap, penyakit_pd3i, surveilans_pd3i, surveilans_ralan, diagnosa_pasien, surveilans_ranap, pny_takmenular_ranap, pny_takmenular_ralan, kunjungan_ralan, rl32, rl33, rl37, rl38, harian_tindakan_dokter, sms, sidikjari, jam_masuk, jadwal_pegawai, parkir_barcode, set_nota, dpjp_ranap, mutasi_barang, rl34, rl36) VALUES (AES_ENCRYPT(:nip, 'nur'), AES_ENCRYPT(:pass, 'windi'),IN(:status)) ", {
    //         replacements: { nip: nip, pass: pass, state: [false] },
    //         type: QueryTypes.INSERT
    //     });
    //     console.log(user);
    //     return user;
    // },
    createUser: async (nip, pass) => {
        console.log(nip);
        console.log(pass);
        let user = await sequelize.query("INSERT INTO user (id_user, password) VALUES (AES_ENCRYPT(:nip, 'nur'), AES_ENCRYPT(:pass, 'windi')) ", {
            replacements: { nip: nip, pass: pass },
            type: QueryTypes.INSERT
        });
        return user;
    },
}
