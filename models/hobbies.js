'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hobbies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Hobbies.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hobbies',
  });
  Hobbies.associate = function(models) {
    Hobbies.belongsTo(models.Student, {
      foreignKey: 'studentId' })
  };
  return Hobbies;
};