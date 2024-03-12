'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pesawat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pesawat.hasOne(models.Penerbangan, {
        foreignKey: 'plane_id', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Pesawat.hasMany(models.Kursi, {
        foreignKey: 'seat_id', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Pesawat.belongsTo(models.Rekanan, {
        foreignKey: 'airplane_partner', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
    }
  }
  Pesawat.init({
    plane_number: DataTypes.STRING,
    plane_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pesawat',
  });
  return Pesawat;
};