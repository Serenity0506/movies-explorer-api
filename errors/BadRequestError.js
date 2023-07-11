const { HttpError } = require('./HttpError');

class BadRequestError extends HttpError {
  constructor(message = 'Запрос сформирован некорректно') {
    super(400, message);
  }
}

module.exports = { BadRequestError };
