const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const models = require('./models');
const loaderCreater = require('./dataLoaders');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req }) => {

    // create new loader instances for every request
    const loaders = loaderCreater();

    return {
      models,
      loaders
    };
  }
});

const app = express();
server.applyMiddleware({ app });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);



































// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
// const DBMessage = require('./models/message');

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   input MessageInput {
//     content: String
//     author: String
//   }

//   type Message {
//     id: ID!
//     content: String
//     author: String
//   }

//   type Query {
//     getMessage(id: ID!): Message
//   }

//   type Mutation {
//     createMessage(input: MessageInput): Message
//     updateMessage(id: ID!, input: MessageInput): Message
//   }
// `);

// // If Message had any complex fields, we'd put them on this object.
// // class Message {
// //   constructor(id, { content, author }) {
// //     this.id = id;
// //     this.content = content;
// //     this.author = author;
// //   }
// // }

// // Maps username to content
// // var fakeDatabase = {};

// var root = {
//   getMessage: async ({ id }) => {
//     const message = await DBMessage.findOne({
//       where: { id }
//     });
//     if (!message) {
//       throw new Error('no message exists with id ' + id);
//     }
//     console.log(message);
//     return message.dataValues;
//   },
//   createMessage: ({ input }) => {
//     // Create a random id for our "database".
//     var id = require('crypto').randomBytes(10).toString('hex');

//     DBMessage.findAll({}).then(result => console.log(result)).catch(e => console.log(e));

//     fakeDatabase[id] = input;
//     return new Message(id, input);
//   },
//   updateMessage: ({ id, input }) => {
//     if (!fakeDatabase[id]) {
//       throw new Error('no message exists with id ' + id);
//     }
//     // This replaces all old data, but some apps might want partial update.
//     fakeDatabase[id] = input;
//     return new Message(id, input);
//   },
// };

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000, () => {
//   console.log('Running a GraphQL API server at localhost:4000/graphql');
// });