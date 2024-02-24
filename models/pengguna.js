'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengguna extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pengguna.hasMany(models.Rekanan, {
        foreignKey: 'id_pengguna', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Pengguna.hasMany(models.Transaksi, {
        foreignKey: 'id_pengguna', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
    }
  }
  Pengguna.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Pengguna',
  });
  return Pengguna;
};