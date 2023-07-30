import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import businessRoutes from './router/businessRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import db from './config/db'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const { host, port, name, username, password } = db;

const dbConnectionString = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`;

mongoose
  .connect(dbConnectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.app.port, () => {
      console.log(
        `Starting development server at \x1b[34m${'http://localhost'}:${config.app.port}\x1b[0m`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Connecting routes
app.use(businessRoutes);
app.use(errorMiddleware);

export default app;
