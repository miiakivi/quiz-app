import TriviaAPI from "../dataSources/triviaApi";

export type ContextValue = {
    dataSources: {
      triviaApi: TriviaAPI;
    };
  }