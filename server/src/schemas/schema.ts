export const typeDefs = `#graphql
  type Category {
    id: Int
    name: String
  }

  type Query {
    getallCategories: [Category]
  }
`;