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

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
    });

    export async function query (query: string) {
        let results;
        try {
            results = await pool.query(query);
        } catch (e) {
            console.error('Error running query: ' + query);
            console.error('Error code: ' + e.code);
            return;
        }
    
        if (results.rows.length == 0) {
            return [];
        } else {
            return results.rows;
        }
    };
}