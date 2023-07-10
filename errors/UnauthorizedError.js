const { HttpError } = require('./HttpError');

class UnauthorizedError extends HttpError {
  constructor(message = 'Бессовествное нарушение границ частной собственности') {
    super(403, message);
  }
}

module.exports = { UnauthorizedError };
