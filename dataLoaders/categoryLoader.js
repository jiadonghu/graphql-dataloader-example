const DataLoader = require("dataloader");
const models = require('../models');

const categoryLoader = new DataLoader((postIds) => {
 
  // find all categories by post ids in one query
  return models.Post.findAll({
    include: {
      as: 'Category',
      model: models.Category
    },
    where: { id: postIds }
  })

  // order of returned array should match the order of postIds 
  .then(posts => {
    const postsById = posts.reduce((value, post) =>{
      value[post.id] = post.Category;
      return value;
    }, {});
    return postIds.map(id => {
      return postsById[id];
    });
  });
});

module.exports = categoryLoader;
