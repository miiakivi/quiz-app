import { ContextValue } from "./types/context";

const resolvers = {
  Query: {
    getallCategories: async ( _: any, __: any, { dataSources }: ContextValue ) => {
      return dataSources.triviaApi.getCategories();
    },
  },
};

export default resolvers;