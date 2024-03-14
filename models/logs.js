'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Logs.belongsTo(models.Pengguna, {
        foreignKey: 'id_pengguna',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Logs.init({
    pesan: DataTypes.STRING,
    waktu: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Logs',
  });
  return Logs;
};