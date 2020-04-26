import { Pool, QueryResult } from "pg";
import logger from "./logger";

const port: number = (process.env.POSTGRES_PORT as unknown) as number;
let pool: Pool;

/**
 * Initialises the database connection pool.
 */
export async function init(): Promise<void> {
	pool = new Pool({
		user: process.env.POSTGRES_USER,
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB,
		password: process.env.POSTGRES_PASSWORD,
		port
	});

	pool.on("error", err => {
		logger.error("Unexpected error on idle client", err);
		process.exit(-1);
	});

	logger.info("Database connection successful");
}

/**
 * Performs a single query against the database connection pool.
 * Contains the raw connection logic.
 * @param query The query to execute
 * @param params The parameters for the query
 * @returns The QueryResult
 */
async function doQuery<R extends {}>(query: string, params?: unknown[]): Promise<QueryResult<R>> {
	let results: QueryResult<R>;

	try {
		if (params) {
			results = await pool.query(query, params);
		} else {
			results = await pool.query(query);
		}

		return results;
	} catch (e) {
		logger.error(`Error running query: ${query}`);
		logger.error(`Error code: ${e.code}`);

		return {
			command: query,
			rowCount: 0,
			oid: 0,
			rows: [],
			fields: []
		};
	}
}

/**
 * Performs a single query against the database connection pool.
 * @param query The query to execute
 * @param params The parameters for the query
 * @returns The rows of the query response
 */
export async function execQuery<R extends {}>(query: string, params?: unknown[]): Promise<R[]> {
	logger.debug("Running query:");
	logger.debug(query);

	const results = await doQuery<R>(query, params);
	return results.rows;
}
