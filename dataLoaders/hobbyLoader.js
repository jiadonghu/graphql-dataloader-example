const DataLoader = require("dataloader");
const models = require('../models');

const hobbyLoader = new DataLoader((studentIds) => {

  // find all posts by student ids in one query
  return models.Hobbies.findAll({
    where: { studentId: studentIds }
  })

    // order of returned array should match the order of studentIds
    .then(hobbies => {
      const hobbiesById = hobbies.reduce((value, hobby) => {
        if (!value[hobby.studentId]) value[hobby.studentId] = [];
        value[hobby.studentId].push(hobby);
        return value;
      }, {});
      return studentIds.map(id => {
        return hobbiesById[id];
      });
    });
});

module.exports = hobbyLoader;
