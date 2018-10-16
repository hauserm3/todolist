"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
require("winston-daily-rotate-file");
class ApiLogger {
    static newInstance() {
        const rotateFileTransport = new winston_1.transports.DailyRotateFile({
            level: process.env.LOG_LEVEL,
            datePattern: 'dd-MM-yyyy.',
            dirname: `./src-server/logs`,
            filename: './log',
            prepend: true,
        });
        const consoleTransport = new winston_1.transports.Console({
            colorize: true,
            prettyPrint: true,
            level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',
        });
        return new winston_1.Logger({
            transports: [rotateFileTransport, consoleTransport],
        });
    }
}
exports.ApiLogger = ApiLogger;
exports.default = ApiLogger.newInstance();
//# sourceMappingURL=logger.js.map