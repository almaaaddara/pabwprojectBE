'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penerbangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penerbangan.hasMany(models.Pemesanan_Kursi, {
        foreignKey: 'id_penerbangan',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
      Penerbangan.belongsTo(models.Pesawat, {
        foreignKey: 'plane_id',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
      Penerbangan.belongsTo(models.Bandara, {
        foreignKey: 'depart_id',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
      Penerbangan.belongsTo(models.Bandara, {
        foreignKey: 'destination_id',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Penerbangan.init({
    departure_time: DataTypes.DATE,
    arival_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Penerbangan',
  });
  return Penerbangan;
};