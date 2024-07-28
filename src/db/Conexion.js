import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

// dotenv.config({ path: './src/env/.env' });

export const pool = createPool({
    host: 'localhost',
    user: 'cesar',
    password: 'cesar',
    database: 'adopet',
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
