const { HttpError } = require('./HttpError');

class InternalServerError extends HttpError {
  constructor(message = 'На сервере произошла ошибка') {
    super(500, message);
  }
}

module.exports = { InternalServerError };
