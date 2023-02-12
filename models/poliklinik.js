'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class poliklinik extends Model {
      /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      static associate(models) {
      }
  }
  poliklinik.init({
    kd_poli: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nm_poli: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'poliklinik',
    tableName: 'poliklinik',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    
    
   
  });
  return poliklinik;
}