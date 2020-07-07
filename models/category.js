'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  Category.associate = function (models) {
    Category.hasMany(models.PostCategory, { foreignKey: 'categoryId', onDelete: 'CASCADE', hooks: true });
    Category.belongsToMany(models.Post, { as: 'Post', through: models.PostCategory, foreignKey: 'categoryId', otherKey: 'postId' });
  };
  return Category;
};