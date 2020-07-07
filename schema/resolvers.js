const categoryLoader = require('../dataLoaders/categoryLoader');
const postLoader = require('../dataLoaders/postLoader');
const hobbyLoader = require('../dataLoaders/hobbyLoader');

const resolvers = {
  Query: {
    async getStudent(root, { id }, { models }) {
      return models.Student.findByPk(id)
    },
    async getAllStudents(root, args, { models }) {
      return models.Student.findAll()
    },
    async getHobbies(root, { id }, { models }) {
      return await models.Hobbies.findByPk(id)
    },
    async getCategory(root, { id }, { models }) {
      return await models.Category.findByPk(id);
    },
    async getPost(root, { id }, { models }) {
      return await models.Post.findByPk(id);
    },
    async getAllPost(root, {}, { models }) {
      return await models.Post.findAll();
    },
    async getAllCategory(root, {}, { models }) {
      return await models.Category.findAll();
    }
  },
  Mutation: {
    async createStudent(root, { firstName, email }, { models }) {
      return models.Student.create({ firstName, email })
    },
    async createHobbies(root, { studentId, title }, { models }) {
      return models.Hobbies.create({ studentId, title })
    },
    async createPost(root, { categoryId, title, content }, { models }) {
      const post = await models.Post.create({ title, content });
      const category = await models.Category.findByPk(categoryId);
      await post.addCategory(category);
      return post;
    },
    async createCategory(root, { name }, { models }) {
      return models.Category.create({ name });
    }
  },
  Student: {
    async hobbies(student) {
      return hobbyLoader.load(student.id);
    }
  },
  Hobbies: {
    async student(Hobbies) {
      return Hobbies.getStudent();
    }
  },
  Post: {
    async category(Post) {
      return categoryLoader.load(Post.id);
    }
  },
  Category: {
    async post(Category) {
      return postLoader.load(Category.id); 
    }
  }

}

module.exports = resolvers