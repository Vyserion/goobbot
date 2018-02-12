import { Pool, Client } from 'pg';

export class Data {

    pool: Pool;

    connect() {
        // This is pretty hacky, but as we're in control of the .env variables,
        // it doesn't matter.
        const port: number = process.env.POSTGRES_PORT as any as number;

        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASSWORD,
            port: port
        });
    };

    async query() {
        const result = await this.pool.query('SELECT NOW()');
        console.log(result.rows[0]);
    };
};