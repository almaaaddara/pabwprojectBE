'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pemesanan_Kursi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pemesanan_Kursi.belongsTo(models.Kursi, {
        foreignKey: 'id_kursi', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Pemesanan_Kursi.belongsTo(models.Transaksi, {
        foreignKey: 'id_transaksi',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
      Pemesanan_Kursi.belongsTo(models.Penerbangan, {
        foreignKey: 'id_penerbangan',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Pemesanan_Kursi.init({
    name: DataTypes.STRING,
    NIK: DataTypes.STRING,
    gender: {
      allowNull: false,
      type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
      defaultValue: "Laki-Laki"
    },
  }, {
    sequelize,
    modelName: 'Pemesanan_Kursi',
  });
  return Pemesanan_Kursi;
};