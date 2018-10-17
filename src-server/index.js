"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const Database = require("./database");
const Configs = require("./configs");
// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);
// Starting Application Server
const serverConfigs = Configs.getServerConfigs();
server_1.default.start(serverConfigs, database);
//# sourceMappingURL=index.js.map