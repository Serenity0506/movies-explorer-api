const { celebrate, Joi } = require('celebrate');

const validateUrl = (text) => /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(text);

const signInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const signUpValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
});

const userValidate = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().custom((value, helpers) => {
        if (!validateUrl(value)) return helpers.message('Field should be a valid url');
  
        return value;
      }),
    }),
  });

  const movieValidate = celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom((value, helpers) => {
        if (!validateUrl(value)) return helpers.message('Field should be a valid url');
        return value;
      }),
      trailerLink: Joi.string().required().custom((value, helpers) => {
        if (!validateUrl(value)) return helpers.message('Field should be a valid url');
        return value;
      }),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (!validateUrl(value)) return helpers.message('Field should be a valid url');
        return value;
      }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  });

  const movieByIdValidate = celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  });
  

module.exports = { validateUrl, userValidate, movieValidate, movieByIdValidate, signInValidate, signUpValidate };