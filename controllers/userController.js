const { NotFoundError } = require('../errors/http/NotFoundError');
const user = require('../models/userModel');


const getUserById = (req, res, next, userId) => {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          throw new NotFoundError();
        } else {
          res.send(user);
        }
      })
      .catch(next);
  };

  const getUserByIdAuth = (req, res, next) => getUserById(req, res, next, req.user._id);

  
  const updateUser = (req, res, next, userData) => {
    User.findByIdAndUpdate(
      req.user._id,
      userData,
      { new: true, runValidators: true },
    )
      .then((user) => {
        if (!user) {
          throw new NotFoundError();
        } else {
          res.send(user);
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
  
  