import pool from './database';

pool.query(`CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY NOT NULL, email TEXT NOT NULL UNIQUE,
    first_name TEXT, last_name TEXT, password TEXT NOT NULL, role TEXT NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
pool.query(`CREATE TABLE IF NOT EXISTS teams(team_id SERIAL PRIMARY KEY NOT NULL, name TEXT NOT NULL UNIQUE,
    wins INT DEFAULT 0, losses INT NOT NULL, draws INT NOT NULL, points INT NOT NULL, position INT NOT NULL,
    goal_for INT NOT NULL, goal_against INT NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

export default pool;
