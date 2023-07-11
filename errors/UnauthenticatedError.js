const { HttpError } = require('./HttpError');

class UnauthenticatedError extends HttpError {
  constructor(message = 'Этому методу требуется токен') {
    super(401, message);
  }
}

module.exports = { UnauthenticatedError };
