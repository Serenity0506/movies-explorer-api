const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersControllers = require('../controllers/usersController');
const { userValidate } = require('../utils/validators');

router.get('/users/me', usersControllers.getUserByIdAuth);

router.patch('/users/me', userValidate, usersControllers.updateUserNameAndAbout);

module.exports = router;
