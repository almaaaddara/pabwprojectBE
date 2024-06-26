'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kursi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kursi.belongsTo(models.Pesawat, {
        foreignKey: 'plane_id',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
      Kursi.hasOne(models.Pemesanan_Kursi, {
        foreignKey: 'id_kursi',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Kursi.init({
    seat_number: DataTypes.STRING,
    seat_status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Kursi',
  });
  return Kursi;
};