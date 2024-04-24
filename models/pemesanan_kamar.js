'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pemesanan_Kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pemesanan_Kamar.belongsTo(models.Kamar, {
        foreignKey: 'id_kamar',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
      Pemesanan_Kamar.belongsTo(models.Rekanan, {
        foreignKey: 'id_rekanan',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
      Pemesanan_Kamar.belongsTo(models.Transaksi, {
        foreignKey: 'id_transaksi',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Pemesanan_Kamar.init({
    name: DataTypes.STRING,
    NIK: DataTypes.STRING,
    gender: {
      allowNull: false,
      type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
      defaultValue: "Laki-Laki"
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pemesanan_Kamar',
  });
  return Pemesanan_Kamar;
};