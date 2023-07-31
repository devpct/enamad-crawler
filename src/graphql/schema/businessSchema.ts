import { buildSchema } from 'graphql';

export const graphQlSchema = buildSchema(`
  scalar Date

  type Business {
    id: ID!
    domainAddress: String!
    businessTitle: String!
    city: String!
    stars: Int!
    grantDate: String!
    expiryDate: String!
  }

  type RootQuery {
    businesses: [Business]
  }

  schema {
    query: RootQuery
  }
`);
