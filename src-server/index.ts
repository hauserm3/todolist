import Server from './server';
import * as Database from './database';
import * as Configs from './configs';

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

Server.start(serverConfigs, database);
