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
      Rekanan.hasMany(models.Hotel, {
        foreignKey: 'id_rekanan', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Rekanan.hasMany(models.Pesawat, {
        foreignKey: 'airplane_partner', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Rekanan.hasMany(models.Pemesanan_Kamar, {
        foreignKey: 'id_rekanan', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Rekanan.hasMany(models.Penerbangan, {
        foreignKey: 'rekanan_id', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Rekanan',
  });
  return Rekanan;
};