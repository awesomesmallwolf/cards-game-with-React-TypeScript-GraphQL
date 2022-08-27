import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { resolvers } from './resolvers';

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const PORT = 5000;

// Start the server
app.listen({ port: PORT }, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
