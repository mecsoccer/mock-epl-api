import pool from './database';

pool.query('DROP TABLE IF EXISTS users;');
pool.query('DROP TABLE IF EXISTS teams;');
