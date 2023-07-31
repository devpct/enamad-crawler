import database from './db';
import { IDatabaseConfig, IAppConfig } from '../interfaces/IConfig';
require('dotenv').config();

interface Config {
  db: IDatabaseConfig;
  app: IAppConfig;
}

const config: Config = {
  db: database,
  app: {
    port: parseInt(process.env.APP_PORT),
  },
};

export default config;
