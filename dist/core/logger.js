"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const vybotLogFormat = printf(info => {
    return `${info.timestamp} - ${info.level} :: ${info.message}`;
});
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info";
const logger = winston_1.createLogger({
    format: combine(timestamp(), vybotLogFormat),
    level: logLevel,
    transports: [
        new winston_1.transports.Console({
            name: "console",
            colorize: true
        })
    ]
});
logger.debug("Logging set to " + logLevel);
exports.default = logger;
//# sourceMappingURL=logger.js.map