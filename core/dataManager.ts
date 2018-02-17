import { Pool, Client } from 'pg';

export namespace DataManager {

    const port: number = process.env.POSTGRES_PORT as any as number;

    let pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: port
    });

    console.log(process.env.POSTGRES_USER);

    export async function query (query: string) {
        let results;
        try {
            results = await pool.query(query);
        } catch (e) {
            console.log(e);
        }
    
        if (results.rows.length == 0) {
            return [];
        } else {
            return results.rows;
        }
    };
}