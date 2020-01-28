/* eslint-disable camelcase */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './database';

dotenv.config();

function migrateUser(email, password, first_name, last_name, role) {
  const hash = bcrypt.hashSync(password, 10);
  const query = {
    text: 'INSERT INTO users(email, password, first_name, last_name, role) VALUES($1, $2, $3, $4, $5);',
    values: [email, hash, first_name, last_name, role],
  };

  pool.query(query);
}

function migrateTeams(name) {
  const query = {
    text: 'INSERT INTO teams(name, wins, losses, draws, points, position, goal_for, goal_against) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [name, 0, 0, 0, 0, 0, 0, 0],
  };

  pool.query(query);
}

migrateUser('mecsoccerguy@gmail.com', 'password', 'jaachimma', 'onyenze', 'admin');
migrateUser('mecsoccerguy.oj@gmail.com', 'password', 'ndukwa', 'onyenze', 'user');
migrateUser('mecsoccer@gmail.com', 'password', 'ndukwa', 'onyenze', 'user');

migrateTeams('liverpool f.c.');
migrateTeams('chelsea f.c.');
migrateTeams('arsenal f.c.');
