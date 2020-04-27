const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const { config } = require("dotenv");
config();

console.log("details", process.env.POSTGRES_USER, "from", process.env);
const databaseConfig = {
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
};

async function createDB(client) {
	console.error("Creating schema...");
	const createScript = await fs.readFileSync(path.join(__dirname, "./db.sql"), "utf-8");
	await client.query(createScript);
}

/**
 * Run any available database upgrades.
 */
async function upgradeDB(client) {
	console.error("Planned feature: DB Upgrade");
	throw new Error("Cannot upgrade DB");
}

/**
 * Main function to run the database setup or upgrade.
 */
async function run() {
	try {
		const client = new Pool(databaseConfig);

		console.log("Checking for vybot database...");
		const databaseQuery = `SELECT EXISTS(
			SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${database}')
		);`;
		const databaseResult = await client.query(databaseQuery, []);
		if (!databaseResult) {
			console.error("Database not found, exiting");
			throw new Error();
		}

		console.log("Checking for tables...");
		const tableQuery = `SELECT EXISTS(
			SELECT FROM pg_tables WHERE schemaname = $1 AND tablename = $2
		);`;

		const tableResult = await client.query(tableQuery, [database, "GUILDS"]);
		if (!tableResult) {
			await upgradeDB(client);
		} else {
			await createDB(client);
		}
	} catch (error) {
		console.log(error);
	}
};

(async () => {
	await run();
})();