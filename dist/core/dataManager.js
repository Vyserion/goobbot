"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const logger_1 = require("./logger");
var DataManager;
(function (DataManager) {
    const port = process.env.POSTGRES_PORT;
    let pool = new pg_1.Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: port
    });
    pool.on("error", (err) => {
        logger_1.default.error("Unexpected error on idle client", err);
        process.exit(-1);
    });
    async function query(query, params) {
        logger_1.default.debug("Running query:", query);
        const results = await doQuery(query, params);
        return results.rows;
    }
    DataManager.query = query;
    async function doQuery(query, params) {
        let results;
        try {
            if (params) {
                results = await pool.query(query, params);
            }
            else {
                results = await pool.query(query);
            }
            return results;
        }
        catch (e) {
            logger_1.default.error("Error running query: " + query);
            logger_1.default.error("Error code: " + e.code);
            return {
                command: query,
                rowCount: 0,
                oid: 0,
                rows: []
            };
        }
    }
})(DataManager = exports.DataManager || (exports.DataManager = {}));
//# sourceMappingURL=dataManager.js.map