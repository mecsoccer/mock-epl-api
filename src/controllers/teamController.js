/* eslint-disable camelcase */
import dotenv from 'dotenv';
import pool from '../models/migrate';

dotenv.config();

export const addTeam = (req, res) => {
  const { name } = req.body;

  if (!/^[\w-\s.]+$/gi.test(name)) {
    return res.status(422).json({ error: 'invalid team name. example of team name: "chelsea fc"', field: 'name' });
  }

  const text = 'INSERT INTO teams(name, wins, losses, draws, points, position, goal_for, goal_against) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
  const values = [name, 0, 0, 0, 0, 0, 0, 0];

  return pool.query(text, values)
    .then((data) => {
      res.status(201).json({ newTeam: data.rows[0] });
    })
    .catch(() => res.status(409).json({ error: 'team already exists', status: 'failed' }));
};

export const viewAllTeams = (req, res) => {
  pool.query('SELECT * FROM teams')
    .then((data) => {
      res.status(200).json({ teams: data.rows });
    })
    .catch(() => res.status(400).json({ error: 'error occured' }));
};

export const viewSingleTeam = (req, res) => {
  const team_id = req.params.id;
  pool.query('SELECT * FROM teams WHERE team_id=$1', [team_id])
    .then((data) => {
      if (!data.rowCount) return Promise.reject();
      return res.status(200).json({ team: data.rows[0] });
    })
    .catch(() => res.status(404).json({ error: `team with id of ${team_id} not found` }));
};

export const updateTeam = (req, res) => {
  const { id } = req.params;
  const { name, wins, losses, draws, points, position, goal_for, goal_against } = req.body;

  const text = 'UPDATE teams SET name=$1, wins=$2, losses=$3, draws=$4, points=$5, position=$6, goal_for=$7, goal_against=$8 WHERE team_id=$9 RETURNING *';
  const values = [name, wins, losses, draws, points, position, goal_for, goal_against, id];

  return pool.query(text, values)
    .then((data) => {
      if (!data.rowCount) return Promise.reject();
      return res.status(200).json({ updatedTeam: data.rows[0] });
    })
    .catch(() => res.status(404).json({ error: `team with id of ${id} not found` }));
};

export const patchTeam = (req, res) => {
  const { id } = req.params;
  const key = Object.keys(req.body)[0];

  if (!key) return res.status(422).json({ error: 'empty body is not allowed' });

  const text = `UPDATE teams SET ${key}=$1 WHERE team_id=$2 RETURNING *`;
  const values = [req.body[key], id];

  return pool.query(text, values)
    .then((data) => {
      if (!data.rowCount) return Promise.reject();
      return res.status(200).json({ updatedTeam: data.rows[0] });
    })
    .catch(() => res.status(404).json({ error: `team with id of ${id} not found` }));
};

export const removeTeam = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM teams WHERE team_id=$1 RETURNING *', [id])
    .then((data) => {
      if (!data.rowCount) return Promise.reject();
      return res.status(200).json({ deletedTeam: data.rows[0] });
    })
    .catch(() => res.status(404).json({ error: `team with id of ${id} not found` }));
};
