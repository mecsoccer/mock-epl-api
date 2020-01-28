/* eslint-disable camelcase */
import Validate from './validationLibrary';


const { validateTextField } = Validate;

class Validation {
  static validateTeamUpdate(req, res, next) {
    const {
      name, wins, losses, draws, points, position, goal_for, goal_against,
    } = req.body;

    const nameValid = validateTextField('name', name, 2, 50, /^[\w-\s.]+$/gi, 'liverpool f.c., manchester united');
    const winsValid = validateTextField('wins', wins, 1, 2, /^\d+$/gi, '2, 29');
    const lossesValid = validateTextField('losses', losses, 1, 2, /^\d+$/gi, '2, 29');
    const drawsValid = validateTextField('draws', draws, 1, 2, /^\d+$/gi, '2, 29');
    const pointsValid = validateTextField('points', points, 1, 3, /^\d+$/gi, '2, 29');
    const positionValid = validateTextField('position', position, 1, 2, /^\d+$/gi, '2, 29');
    const goalForValid = validateTextField('goal_for', goal_for, 1, 5, /^\d+$/gi, '2, 29');
    const goalAgainstValid = validateTextField('goal_against', goal_against, 1, 2, /^\d+$/gi, '2, 29');

    if (nameValid !== true) {
      res.status(422).json({ error: nameValid.error, status: 'error', field: nameValid.field });
    } else if (winsValid !== true) {
      res.status(422).json({ error: winsValid.error, status: 'error', field: winsValid.field });
    } else if (lossesValid !== true) {
      res.status(422).json({ error: lossesValid.error, status: 'error', field: lossesValid.field });
    } else if (drawsValid !== true) {
      res.status(422).json({ error: drawsValid.error, status: 'error', field: drawsValid.field });
    } else if (pointsValid !== true) {
      res.status(422).json({ error: pointsValid.error, status: 'error', field: pointsValid.field });
    } else if (positionValid !== true) {
      res.status(422).json({ error: positionValid.error, status: 'error', field: positionValid.field });
    } else if (goalForValid !== true) {
      res.status(422).json({ error: goalForValid.error, status: 'error', field: goalForValid.field });
    } else if (goalAgainstValid !== true) {
      res.status(422).json({ error: goalAgainstValid.error, status: 'error', field: goalAgainstValid.field });
    } else {
      next();
    }
  }

  static validateTeamPatch(req, res, next) {
    const {
      name, wins, losses, draws, points, position, goal_for, goal_against,
    } = req.body;

    const nameValid = validateTextField('name', name, 2, 50, /^[\w-\s.]+$/gi, 'liverpool f.c., manchester united', false);
    const winsValid = validateTextField('wins', wins, 1, 2, /^\d+$/gi, '2, 29', false);
    const lossesValid = validateTextField('losses', losses, 1, 2, /^\d+$/gi, '2, 29', false);
    const drawsValid = validateTextField('draws', draws, 1, 2, /^\d+$/gi, '2, 29', false);
    const pointsValid = validateTextField('points', points, 1, 3, /^\d+$/gi, '2, 29', false);
    const positionValid = validateTextField('position', position, 1, 2, /^\d+$/gi, '2, 29', false);
    const goalForValid = validateTextField('goal_for', goal_for, 1, 5, /^\d+$/gi, '2, 29', false);
    const goalAgainstValid = validateTextField('goal_against', goal_against, 1, 2, /^\d+$/gi, '2, 29', false);

    if (nameValid !== true) {
      res.status(422).json({ error: nameValid.error, status: 'error', field: nameValid.field });
    } else if (winsValid !== true) {
      res.status(422).json({ error: winsValid.error, status: 'error', field: winsValid.field });
    } else if (lossesValid !== true) {
      res.status(422).json({ error: lossesValid.error, status: 'error', field: lossesValid.field });
    } else if (drawsValid !== true) {
      res.status(422).json({ error: drawsValid.error, status: 'error', field: drawsValid.field });
    } else if (pointsValid !== true) {
      res.status(422).json({ error: pointsValid.error, status: 'error', field: pointsValid.field });
    } else if (positionValid !== true) {
      res.status(422).json({ error: positionValid.error, status: 'error', field: positionValid.field });
    } else if (goalForValid !== true) {
      res.status(422).json({ error: goalForValid.error, status: 'error', field: goalForValid.field });
    } else if (goalAgainstValid !== true) {
      res.status(422).json({ error: goalAgainstValid.error, status: 'error', field: goalAgainstValid.field });
    } else {
      next();
    }
  }
}

export default Validation;
