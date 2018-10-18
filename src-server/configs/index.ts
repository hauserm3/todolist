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
  connection: string;
}

export function getDatabaseConfig(): IDataConfiguration {
  return configs.get("database");
}

export function getServerConfigs(): IServerConfigs {
  return configs.get("server");
}

export interface IServerConfigs {
  host: string;
  port: number;
  jwtSecret: string;
  jwtExpiration: string;
}