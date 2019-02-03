import { Pool, QueryResult } from "pg";
import logger from "./logger";

const port: number = (process.env.POSTGRES_PORT as any) as number;
let pool;

export async function init() {
	pool = new Pool({
		user: process.env.POSTGRES_USER,
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DATABASE,
		password: process.env.POSTGRES_PASSWORD,
		port: port
	});

	pool.on("error", err => {
		logger.error("Unexpected error on idle client", err);
		process.exit(-1);
	});

	logger.info("Database connection successful");
}

export async function execQuery(query: string, params?: any[]) {
	logger.debug("Running query:");
	logger.debug(query);

	const results = await doQuery(query, params);
	return results.rows;
}

async function doQuery(query: string, params?: any[]): Promise<QueryResult> {
	let results: QueryResult;

	try {
		if (params) {
			results = await pool.query(query, params);
		} else {
			results = await pool.query(query);
		}

		return results;
	} catch (e) {
		logger.error("Error running query: " + query);
		logger.error("Error code: " + e.code);

		return {
			command: query,
			rowCount: 0,
			oid: 0,
			rows: [],
			fields: []
		};
	}
}
