const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersControllers = require('../controllers/usersController');
const { validateUrl } = require('../utils/validators');

router.get('/users/me', usersControllers.getUserByIdAuth);

router.patch('/users/me', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().custom((value, helpers) => {
        if (!validateUrl(value)) return helpers.message('Field should be a valid url');
  
        return value;
      }),
    }),
  }), usersControllers.updateUserNameAndAbout);

module.exports = router;
