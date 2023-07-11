const { HttpError } = require('./HttpError');

class NotFoundError extends HttpError {
  constructor(message = 'Ресурс не найден') {
    super(404, message);
  }
}

module.exports = { NotFoundError };
