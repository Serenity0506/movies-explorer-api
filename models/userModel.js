const { Schema } = require('mongoose');
const validator = require('validator');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');



const userSchema = new Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
          },
    },
    password: {
        required: true,
        type: String,
        select: false,
      },
});


userSchema.statics.findUserByCredentials = (email, password) => model('user').findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(new UnauthenticatedError('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthenticatedError('Неправильные почта или пароль'));
        }

        return user;
      });
  });

module.exports = model('user', userSchema);
