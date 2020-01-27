/* eslint-disable camelcase */
import Validate from './validationLibrary';


const { validateTextField, validatePasswordField } = Validate;

class Validation {
  static validateUser(req, res, next) {
    const {
      email, password, first_name, last_name, role,
    } = req.body;

    const emailValid = validateTextField('email', email, 7, 100, /^[a-z][\w\.-]+@[a-z]+\.[a-z]+$/gi, 'myname@mycompanyname.com');
    const firstNameValid = validateTextField('first_name', first_name, 2, 30, /^[a-z]+$/gi, 'john, james', false);
    const lastNameValid = validateTextField('last_name', last_name, 2, 30, /^[a-z]+$/gi, 'john, james', false);
    const passwordValid = validatePasswordField('password', password, 8, 16, 'dkSSD32336##');
    const roleValid = validateTextField('role', role, 4, 5, /^(admin|user)+$/gi, 'user, admin');

    if (emailValid !== true) {
      res.status(422).json({ error: emailValid.error, status: 'error', field: emailValid.field });
    } else if (firstNameValid !== true) {
      res.status(422).json({ error: firstNameValid.error, status: 'error', field: firstNameValid.field });
    } else if (lastNameValid !== true) {
      res.status(422).json({ error: lastNameValid.error, status: 'error', field: lastNameValid.field });
    } else if (passwordValid !== true) {
      res.status(422).json({ error: passwordValid.error, status: 'error', field: passwordValid.field });
    } else if (roleValid !== true) {
      res.status(422).json({ error: roleValid.error, status: 'error', field: roleValid.field });
    } else {
      next();
    }
  }
}

export default Validation;
