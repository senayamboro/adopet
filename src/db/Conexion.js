import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

// dotenv.config({ path: './src/env/.env' });

export const pool = createPool({
    host: 'be5wr48gwgcnsfm4k7ii-mysql.services.clever-cloud.com',
    user: 'urjwbpqd5bwrzc2q',
    password: 'urjwbpqd5bwrzc2q',
    database: 'be5wr48gwgcnsfm4k7ii',
    port: 3306
});

pool.getConnection()
    .then(conn => {
        console.log('Conexión exitosa a la base de datos');
        conn.release();
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err.stack);
    });
