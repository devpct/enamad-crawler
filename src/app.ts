import express from 'express'
import mongoose from 'mongoose'
import config from './config/config'
import businessRoutes from './router/businessRoutes'
import errorMiddleware from './middlewares/errorMiddleware'
import db from './config/db'
import cors from 'cors'
import graphQlRoutes from './graphql/businessGraphql'
import csvRoutes from './router/csvRoutes'

const app = express()
app.use(express.json())
app.use(cors())

const { host, port, name, username, password } = db

const dbConnectionString = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`

mongoose
  .connect(dbConnectionString)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', 'Connected to MongoDB')
    app.listen(config.app.port, () => {
      console.log(`Starting development server at \x1b[34mhttp://localhost:${config.app.port}\x1b[0m`)

      console.log(`GraphQL API is now running on \x1b[35mhttp://localhost:${config.app.port}/graphql\x1b[0m`)

      console.log('\x1b[1m\x1b[37mDownload the excel file of the database http://localhost:4000/v1/export-csv\x1b[0m')

    })
  })
  .catch((error) => {
    console.log(error)
  })

// Connecting routes
app.use(businessRoutes)
app.use(csvRoutes)
app.use(errorMiddleware)

// Register GraphQL routes
graphQlRoutes(app)
export default app
