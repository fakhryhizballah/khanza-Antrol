'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  pasien.init({
    no_rkm_medis: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nm_pasien: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    jk: DataTypes.ENUM('L', 'P'),
    no_ktp: DataTypes.STRING,
    // createdAt: { type: DataTypes.DATE, field: 'created_at' },
    // updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
     // If don't want createdAt
  }, {
    sequelize,
    modelName: 'pasien',
    tableName: 'pasien',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    
    
   
  });
  return pasien;
};