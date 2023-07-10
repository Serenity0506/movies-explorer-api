const { HttpError } = require('./HttpError');

class ConflictError extends HttpError {
  constructor(message = 'Тут назрел конфликт') {
    super(409, message);
  }
}

module.exports = { ConflictError };
