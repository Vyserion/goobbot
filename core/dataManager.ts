import { Pool, Client } from 'pg';

export class DataManager {

    pool: Pool;

    constructor() {
        this.connect();
    }

    connect() {
        // This is pretty hacky, but as we're in control of the .env variables,
        // it doesn't matter.
        const port: number = process.env.POSTGRES_PORT as any as number;

        // TODO: try catch this - fails on fail connect
        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASSWORD,
            port: port
        });
    };

    async query(query: string) {
        let results;
        try {
            results = await this.pool.query(query);
        } catch (e) {
            console.log(e);
        }

        if (results.rows.length == 0) {
            return [];
        } else {
            return results.rows;
        }
    };
};