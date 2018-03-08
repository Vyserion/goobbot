"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    pool.on('error', (err, client) => {
        logger_1.default.error('Unexpected error on idle client', err);
        process.exit(-1);
    });
    function query(query, params) {
        let results = this.doQuery(query, params);
        return results.rows;
    }
    DataManager.query = query;
    ;
    function doQuery(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let results;
            try {
                if (params) {
                    results = yield pool.query(query, params);
                }
                else {
                    results = yield pool.query(query);
                }
                return results;
            }
            catch (e) {
                logger_1.default.error('Error running query: ' + query);
                logger_1.default.error('Error code: ' + e.code);
                return {
                    rows: []
                };
            }
        });
    }
})(DataManager = exports.DataManager || (exports.DataManager = {}));
//# sourceMappingURL=dataManager.js.map