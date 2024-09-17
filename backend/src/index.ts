import "reflect-metadata";

import { ApolloServer, gql } from "apollo-server";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task-resolver";
import path from "path";

async function setup() {
  const schema = await buildSchema({
    resolvers: [TaskResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({ schema });
  const { url } = await server.listen();

  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

setup();
