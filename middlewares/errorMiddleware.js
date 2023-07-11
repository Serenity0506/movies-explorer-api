const { Error: MongooseError } = require('mongoose');
const { BadRequestError } = require('../errors/BadRequestError');
const { HttpError } = require('../errors/HttpError');
const { InternalServerError } = require('../errors/InternalServerError');
const { ConflictError } = require('../errors/ConflictError');

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
