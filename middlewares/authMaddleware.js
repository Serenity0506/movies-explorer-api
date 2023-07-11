const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/UnauthenticatedError');
const { JWT_SECRET } = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthenticatedError());
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthenticatedError());
  }

  req.user = payload;
  return next();
};

module.exports = { checkToken };
