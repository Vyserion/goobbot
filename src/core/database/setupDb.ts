import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { TableNames } from "./tableNames";
import { execQuery } from "./dataManager";
import logger from "../util/logger";

const DATABASE_NAME = process.env.POSTGRES_DB;
const INITIAL_TABLES_SCRIPT_PATH = "data/initialTables.sql";
const MIGRATION_SCRIPTS_PATH = "data/migrations";

/**
 * Check that the database exists and is ready for use.
 */
async function confirmDatabaseExists(): Promise<void> {
	const databaseQuery = `SELECT EXISTS(
		SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${DATABASE_NAME}')
	);`;
	const databaseResult = await execQuery(databaseQuery, []);
	if (!databaseResult) {
		logger.error(`Database ${DATABASE_NAME} not found, exiting`);
		throw new Error(`Database ${DATABASE_NAME} not found, exiting`);
	}
}

/**
 * Insert the base tables for the database, using the root script found in /data.
 */
async function insertBaseTables(): Promise<void> {
	try {
		logger.info("Running core data scripts...");
		const path = join(__dirname, `/../../../${INITIAL_TABLES_SCRIPT_PATH}`);
		const baseTablesInsertionQuery = readFileSync(path, "utf8");
		await execQuery(baseTablesInsertionQuery);
		logger.info("Core data scripts complete");
	} catch (error) {
		logger.error("Error running core data scripts");
		logger.debug(error.message);
		throw new Error(error);
	}
}

/**
 * Check for the existence of a compeleted migration script.
 * @param scriptName The name of the script
 * @returns True if the migration has run, false otherwise
 */
async function checkForMigrationScript(scriptName: string): Promise<boolean> {
	const query = `SELECT COUNT(filename) FROM migration_scripts WHERE filename = $1 AND state = 'complete'`;
	const params: string[] = [scriptName];
	const result = await execQuery<{ count: number }>(query, params);
	return result[0].count === 1;
}

/**
 * Run any outstanding migration scripts to update the database.
 */
async function runMigrationScripts(): Promise<void> {
	const scriptsPath = join(__dirname, `/../../../${MIGRATION_SCRIPTS_PATH}`);
	const scripts = readdirSync(scriptsPath);

	const insertPendingScriptQuery = `INSERT INTO ${TableNames.MIGRATION_SCRIPTS}
		VALUES ($1, NOW())
		ON CONFLICT ON CONSTRAINT migration_scripts_pkey
		DO UPDATE SET state = 'pending'`;
	const updatePendingScriptQuery = `UPDATE ${TableNames.MIGRATION_SCRIPTS}
		SET state = $1
		WHERE filename = $2`;

	logger.info("Running migration scripts...");

	// eslint-disable-next-line no-restricted-syntax
	for (const scriptName of scripts) {
		// eslint-disable-next-line no-await-in-loop
		const scriptComplete = await checkForMigrationScript(scriptName);
		if (!scriptComplete) {
			// eslint-disable-next-line no-await-in-loop
			await execQuery(insertPendingScriptQuery, [scriptName]);

			logger.info(`Running migration: ${scriptName}...`);

			const migrationPath = join(__dirname, `/../../../${MIGRATION_SCRIPTS_PATH}/${scriptName}`);
			let updateParams: string[] = [];
			try {
				const migrationScript = readFileSync(migrationPath, "utf8");
				// eslint-disable-next-line no-await-in-loop
				await execQuery(migrationScript);
				updateParams = ["complete"];
				logger.info(`Migration ${scriptName} complete`);
			} catch (error) {
				updateParams = ["failed"];
				logger.info(`Migration ${scriptName} complete`);
			} finally {
				updateParams.push(scriptName);
				// eslint-disable-next-line no-await-in-loop
				await execQuery(updatePendingScriptQuery, updateParams);
			}
		}
	}

	logger.info("Migration scripts complete");
}

/**
 * Run all database setup steps to ensure the database is running and up to date.
 */
export async function setupDb(): Promise<void> {
	await confirmDatabaseExists();
	await insertBaseTables();
	await runMigrationScripts();
}
