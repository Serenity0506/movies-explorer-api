const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/userModel');
const { UnauthenticatedError } = require('../errors/UnauthenticatedError');
const { JWT_SECRET } = require('../utils/constants');

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  return user.findUserByCredentials(email, password)
    .then((u) => {
      res.send({
        token: jwt.sign(
          { _id: u._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        ),
      });
    })
    .catch((err) => next(new UnauthenticatedError(err.message)));
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      email,
      password: hash,
      name,
    }))
    .then((u) => {
      const us = u.toObject();
      delete us.password;
      res.status(201).send(us);
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
