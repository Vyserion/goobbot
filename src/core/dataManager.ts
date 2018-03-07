import { Pool, Client } from 'pg';
import logger from './logger';

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
        logger.error('Unexpected error on idle client', err);
        process.exit(-1);
    });

    export async function query (query: string, params?: any[]) {
        let results;
        try {
            if (params) {
                results = await pool.query(query, params);
            } else {
                results = await pool.query(query);
            }
        } catch (e) {
            logger.error('Error running query: ' + query);
            logger.error('Error code: ' + e.code);
            return;
        }
    
        if (results.rows.length == 0) {
            return [];
        } else {
            return results.rows;
        }
    };
}