'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.belongsTo(models.Rekanan, {
        foreignKey: 'id_rekanan', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
      Hotel.hasMany(models.Kamar, {
        foreignKey: 'id_hotel', // Asumsi Anda memiliki kolom bernama rekananId di tabel Pesawat untuk menyimpan asosiasi
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      });
    }
  }
  Hotel.init({
    image: DataTypes.STRING,
    facility: DataTypes.STRING,
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};