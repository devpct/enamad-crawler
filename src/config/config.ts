import database from './db';
import { IDatabaseConfig, IAppConfig } from '../interfaces/IConfig';

interface Config {
  db: IDatabaseConfig;
  app: IAppConfig;
}

const config: Config = {
  db: database,
  app: {
    port: 3000,
  },
};

export default config;
