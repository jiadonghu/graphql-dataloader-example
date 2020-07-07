const categoryLoaderCreater = require('./categoryLoader');
const postLoaderCreater = require('./postLoader');
const hobbyLoaderCreater = require('./hobbyLoader');

const loaderCreater = () => {
  const categoryLoader = categoryLoaderCreater();
  const postLoader = postLoaderCreater();
  const hobbyLoader = hobbyLoaderCreater();

  return {
    categoryLoader,
    postLoader,
    hobbyLoader
  };
};

module.exports = loaderCreater;