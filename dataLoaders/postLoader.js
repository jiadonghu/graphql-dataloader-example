const DataLoader = require("dataloader");
const models = require('../models');

const postLoader = () => {

  return new DataLoader((categoryIds) => {

    // find all posts by category ids in one query
    return models.Category.findAll({
      include: {
        as: 'Post',
        model: models.Post
      },
      where: { id: categoryIds }
    })

      // order of returned array should match the order of categoryIds
      .then(categories => {
        const categoriesById = categories.reduce((value, category) => {
          value[category.id] = category.Post;
          return value;
        }, {});
        return categoryIds.map(id => {
          return categoriesById[id] || null;
        });
      });
  });

};

module.exports = postLoader;
