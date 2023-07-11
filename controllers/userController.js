const { NotFoundError } = require('../errors/NotFoundError');
const user = require('../models/userModel');

const getUserById = (req, res, next, userId) => {
  user.findById(userId)
    .then((u) => {
      if (!u) {
        throw new NotFoundError();
      } else {
        res.send(u);
      }
    })
    .catch(next);
};

const getUserByIdAuth = (req, res, next) => getUserById(req, res, next, req.user._id);

const updateUser = (req, res, next, userData) => {
  user.findByIdAndUpdate(
    req.user._id,
    userData,
    { new: true, runValidators: true },
  )
    .then((us) => {
      if (!us) {
        throw new NotFoundError();
      } else {
        res.send(us);
      }
    })
    .catch(next);
};

const updateUserNameAndAbout = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
};

module.exports = {
  getUserByIdAuth,
  updateUserNameAndAbout,
};
