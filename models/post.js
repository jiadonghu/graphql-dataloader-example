'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.associate = function (models) {
    Post.hasMany(models.PostCategory, { foreignKey: 'postId', onDelete: 'CASCADE', hooks: true });
    Post.belongsToMany(models.Category, { as: 'Category', through: models.PostCategory, foreignKey: 'postId', otherKey: 'categoryId' });
  };

  return Post;
};