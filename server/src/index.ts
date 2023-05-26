import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import TriviaAPI from "./dataSources/triviaApi";

import type { ContextValue } from "./types/context";

import { typeDefs } from "./schemas/schema";
import resolvers from "./resolvers";

const server = new ApolloServer<ContextValue> ( {
  typeDefs,
  resolvers,
} );

async function startServer<ContextValue> () {
  const {url} = await startStandaloneServer( server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          triviaApi: new TriviaAPI( { cache } ),
        },
      };
    },
  } );

  console.log( `🚀  Server ready at ${url}` );

}

startServer();
