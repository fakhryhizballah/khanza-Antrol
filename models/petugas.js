'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  petugas.init({
    nip: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama: DataTypes.STRING,
    jk: DataTypes.ENUM('L', 'P'),
    tgl_lahir: DataTypes.DATE,
    no_ktp: DataTypes.STRING,
    // createdAt: { type: DataTypes.DATE, field: 'created_at' },
    // updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
     // If don't want createdAt
  }, {
    sequelize,
    modelName: 'petugas',
    tableName: 'petugas',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    
    
   
  });
  return petugas;
};