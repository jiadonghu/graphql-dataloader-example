
const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Student {
    id: Int!
    firstName: String!
    email: String!
    hobbies: [Hobbies!]!
  }
  type Hobbies {
    id: Int!
    title: String!
    student: Student!
  }
  type Post {
    id: Int!
    title: String!
    content: String
    category: [Category]!
  }
  type Category {
    id: Int!
    name: String!
    post: [Post]!
  }
  type Query {
    getStudent(id: Int!): Student
    getAllStudents: [Student!]!
    getHobbies(id: Int!): Hobbies
    getPost(id: Int!): Post
    getCategory(id: Int!): Category
    getAllPost: [Post]!
    getAllCategory: [Category]!
  }
  type Mutation {
    createStudent(firstName: String!, email: String!): Student!
    createHobbies(studentId: Int!, title: String!): Hobbies!
    createPost(categoryId: Int!, title: String!, content: String!): Post!
    updatePost(id: Int!, categoryId: Int!, title: String!, content: String!): Post!
    createCategory(name: String!): Category!
    deletePost(id: Int!): Post!
  }
`

module.exports = typeDefs