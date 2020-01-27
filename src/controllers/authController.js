/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import uniqId from 'uniqid';
import uuidv4 from 'uuid/v4';
import pool from '../models/migration';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const signUp = (req, res) => {
  const {
    email, password, first_name, last_name, role,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const text = 'INSERT INTO users(email, password, first_name, last_name, role) VALUES($1, $2, $3, $4, $5) RETURNING email, first_name, last_name, role';
  const values = [email, hash, first_name, last_name, role];

  pool.query(text, values)
    .then((data) => {
      res.status(201).json({ newUser: data.rows[0] });
    })
    .catch(() => res.status(409).json({ error: 'email already exists', status: 'failed' }));
};

export const signIn = (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM users WHERE email=$1;', [email])
    .then((data) => {
      if (!data.rows[0]) return res.status(401).json({ status: 'failed', error: 'wrong email or password' });

      const user = data.rows[0];
      const authenticated = bcrypt.compareSync(password, user.password);

      if (!authenticated) {
        return res.status(401).json({ status: 'failed', error: 'wrong email or password' });
      }

      const token = jwt.sign(user, secret, { expiresIn: '72hr' });
      delete user.password;
      user.token = token;

      return res.status(200).json({ user, status: 'success' });
    })
    .catch(() => res.status(500).json({ status: 'failed', error: 'error occured' }));
};
