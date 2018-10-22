import * as Hapi from "hapi";
import Routes from "./routes";
import { IDatabase } from "../../database";
import { IServerConfigs } from "../../configs";

export function init(
  server: Hapi.Server,
  configs: IServerConfigs,
  database: IDatabase
) {
  Routes(server, configs, database);
}