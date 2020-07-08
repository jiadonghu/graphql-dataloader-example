const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const passport  = require('passport');
// const passportJWT = require('passport-jwt');
// const jwt = require('jsonwebtoken');

const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const models = require('./models');
const loaderCreater = require('./dataLoaders');

// const opts = {};
// opts.jwtFromRequest = passportJWT.ExtractJwt.fromHeader('authorization');
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// passport.use(new passportJWT.Strategy(opts, function (jwt_payload, done) {
//   console.log(jwt_payload);
//   return done(null, { message: 'jwt' });
// }));

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
// app.use(passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   console.log('-----mid')
//   next();
// })
server.applyMiddleware({ app });

// app.get('/login', async (req, res, next) => {
//   const token = await jwt.sign({ foo: 'new token' }, opts.secretOrKey, {
//     audience: opts.audience,
//     issuer: opts.issuer
//   });
//   res.status(200).json(token);
// });

// app.get('/test', passport.authenticate('jwt', { session: false }),async (req, res, next) => {
//   res.status(200).json({message: 'successful'});
// });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);