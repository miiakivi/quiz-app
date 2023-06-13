import { ContextValue } from "./types/context";
import { QuestionRequestArgs } from "./types/quizQuestions";

const resolvers = {
  Query: {
    getAllCategories: async ( _: any, __: any, { dataSources }: ContextValue ) => {
      return dataSources.triviaApi.getCategories();
    },
    getQuestionCountFromCategory: async ( _: any, { id }: {id: number}, { dataSources }: ContextValue   ) => {
      console.log( "id", id );
      return await dataSources.triviaApi.getCategoryQuestionCount( id );
    },
    getRandomQuizQuestions: async ( _: any, questionArgs: QuestionRequestArgs, { dataSources }: ContextValue ) => {
      return dataSources.triviaApi.getQuizQuestions( questionArgs );
    },
  },
};

export default resolvers;