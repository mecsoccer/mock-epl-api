class Validate {
  static validateTextField(field, input, min = 2, max = 10, regEx, example, required = true) {
    let message = '';

    /* istanbul ignore if */if (!input) {
      message = { error: `${field} must be included`, field };
    } else if (input.length < min || input.length > max) {
      message = { error: `${field} length should be between ${min} and ${max} character(s)`, field };
    } else if (regEx.test(input) === false) {
      message = { error: `wrong ${field} format. example ${field}s: ${example}`, field };
    } else {
      message = true;
    }

    if (!input && required === false) message = true;

    return message;
  }

  static validatePasswordField(field, input, min, max, example, required = true) {
    let message = '';

    const regEx1 = /[a-z]+/g;
    const regEx2 = /[A-Z]+/g;
    const regEx3 = /[0-9]+/g;
    const regEx4 = /[@#$]+/g;

    /* istanbul ignore if */if (!input) {
      message = { error: `${field} must be included`, field };
    } else if (input.length < min || input.length > max) {
      message = { error: `${field} length should be between ${min} and ${max} character(s)`, field };
    }/* else if (regEx1.test(input) === false) {
      message = { error: `wrong ${field} format. one lowercase character must be included. example ${field}s: ${example}`, field };
    } else if (regEx2.test(input) === false) {
      message = { error: `wrong ${field} format. one uppercase character must be included. example ${field}s: ${example}`, field };
    } else if (regEx3.test(input) === false) {
      message = { error: `wrong ${field} format. one numeric character must be included. example ${field}s: ${example}`, field };
    } else if (regEx4.test(input) === false) {
      message = { error: `wrong ${field} format. one of (@#$) characters must be included. example ${field}s: ${example}`, field };
    }*/ else {
      message = true;
    }

    if (!input && required === false) message = true;

    return message;
  }
}

export default Validate;
