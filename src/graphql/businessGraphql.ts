import { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { graphQlSchema } from './schema/businessSchema'
import { graphQlResolvers } from './resolvers/businessResolver'

const route: Router = Router()

export default (app: Router) => {
  app.use('/graphql', route)

  // Remove middlewares.isAuth and middlewares.attachCurrentUser if not needed for your business logic.

  route.use(
    '/',
    graphqlHTTP({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
    }),
  )
}
