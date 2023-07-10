const { Error: MongooseError } = require('mongoose');
const { BadRequestError } = require('../errors/http/BadRequestError');
const { HttpError } = require('../errors/http/HttpError');
const { InternalServerError } = require('../errors/http/InternalServerError');
const { ConflictError } = require('../errors/http/ConflictError');

// eslint-disable-next-line no-unused-vars
const handleExceptions = (err, req, res, next) => {
  let httpError;

  if (err instanceof MongooseError.ValidationError || err instanceof MongooseError.CastError) {
    httpError = new BadRequestError('Некорректный запрос');
  } else if (err instanceof HttpError) {
    httpError = err;
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    httpError = new ConflictError();
  } else {
    httpError = new InternalServerError();
  }

  // console.log(err);

  res
    .status(httpError.statusCode)
    .send({ message: httpError.message });
};

module.exports = { handleExceptions };
