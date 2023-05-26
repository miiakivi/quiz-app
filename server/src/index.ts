import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { RESTDataSource } from "@apollo/datasource-rest";

type Category = {
  id: number;
  name: string;
}

type CategoryResponse = {
  trivia_categories: Category[];
}

const typeDefs = `#graphql
  type Category {
    id: Int
    name: String
  }

  type Query {
    getallCategories: [Category]
  }
`;

class TriviaAPI extends RESTDataSource {
  override baseURL = "https://opentdb.com/";
  test = "test";
  anotrher = "test ";
  te = [ 1, 2, 3 ];

  async getCategories (): Promise<CategoryResponse> {
    const response = await this.get( "api_category.php" );
    return response.trivia_categories;
  }

  async getCategoryQuestionCount (): Promise<CategoryResponse> {
    const response = await this.get( "api_category.php" );
    return response.trivia_categories;
  }

}

type ContextValue = {
  dataSources: {
    triviaApi: TriviaAPI;
  };
}

const resolvers = {
  Query: {
    getallCategories: async ( _: any, __: any, { dataSources }: ContextValue ) => {
      return dataSources.triviaApi.getCategories();
    },
  },
};

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



/*
class OpenTriviaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://opentdb.com/';
  }

  async getCategories(): Promise<Category[]> {
    const response = await this.get('api_category.php');
    return response.trivia_categories;
  }
}

const typeDefs = `#graphql
  type Category {
    id: Int
    name: String
  }

  type Query {
    categories: [Category]
  }
`;

const resolvers = {
  Query: {
    categories: (_: any, __: any, { dataSources }: { dataSources: { openTriviaAPI: OpenTriviaAPI } }): Promise<Category[]> => {
      return dataSources.openTriviaAPI.getCategories();
    },
  },
};

class OpenTriviaDataSource extends DataSource {
  private openTriviaAPI: OpenTriviaAPI;

  constructor() {
    super();
    this.openTriviaAPI = new OpenTriviaAPI();
  }

  async getCategories(): Promise<Category[]> {
    return this.openTriviaAPI.getCategories();
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    openTriviaAPI: new OpenTriviaDataSource(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});*/