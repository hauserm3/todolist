import * as nconf from "nconf";
import * as path from "path";

const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, `./config.json`)
  }
});

export interface IDataConfiguration {
  connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration {
  return configs.get("database");
}

export function getServerConfigs(): IServerConfigs {
  return configs.get("server");
}

export interface IServerConfigs {
  port: number;
  jwtSecret: string;
  jwtExpiration: string;
}