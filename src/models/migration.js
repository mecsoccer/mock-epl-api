import pool from './database';

pool.query(`CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY NOT NULL, email TEXT NOT NULL UNIQUE,
    first_name TEXT, last_name TEXT, password TEXT NOT NULL, role TEXT NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

export default pool;
