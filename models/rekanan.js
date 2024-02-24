'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rekanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rekanan.hasMany(models.Pesawat, {
        foreignKey: 'airplane_partner', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Rekanan.hasMany(models.Pemesanan_Kamar, {
        foreignKey: 'airplane_partner', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Rekanan.belongsTo(models.Pengguna, {
        foreignKey: 'id_pengguna',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Rekanan.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rekanan',
  });
  return Rekanan;
};