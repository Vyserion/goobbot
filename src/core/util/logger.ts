import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

const vybotLogFormat = printf(info => {
	return `${info.timestamp} - ${info.level} :: ${info.message}`;
});

const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info";

const consoleTransport = new transports.Console();
consoleTransport.silent = process.env.NODE_ENV === "test";

const logger = createLogger({
	format: combine(timestamp(), vybotLogFormat),
	level: logLevel,
	transports: [consoleTransport]
});

logger.debug(`Logging set to ${logLevel}`);

export default logger;
