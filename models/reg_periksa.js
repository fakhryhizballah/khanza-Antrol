'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reg_periksa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Food_variant.hasOne(models.Foods, {
      //   foreignKey: 'id',
      //   sourceKey: 'food_id',
      //   as: 'category'
      // });
      reg_periksa.belongsTo(models.pasien, {
        foreignKey: 'no_rkm_medis',
        sourceKey: 'no_rkm_medis',
        as: 'pasien'
      });
      reg_periksa.belongsTo(models.kamar_inap, {
        foreignKey: 'no_rawat',
        sourceKey: 'no_rawat',
        as: 'kamar_inap'
        });
    }
    
  }
  reg_periksa.init({
    no_reg: DataTypes.STRING,
    no_rawat: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tgl_registrasi: DataTypes.DATE,
    jam_reg: DataTypes.TIME,
    kd_dokter: DataTypes.STRING,
    no_rkm_medis: DataTypes.STRING,
    kd_dokter: DataTypes.STRING,
    kd_poli: DataTypes.STRING,
    status_poli: DataTypes.ENUM('Lama','Baru'),
    stts_daftar: DataTypes.ENUM('-','Lama','Baru'),
    status_lanjut: DataTypes.ENUM('Ralan','Ranap'),
  }, {
    sequelize,
    modelName: 'reg_periksa',
    tableName: 'reg_periksa',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    
    
   
  });
  return reg_periksa;
};