'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room_Type.belongsTo(models.Kamar, {
        foreignKey: 'room_type',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Room_Type.init({
    room_type: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room_Type',
  });
  return Room_Type;
};