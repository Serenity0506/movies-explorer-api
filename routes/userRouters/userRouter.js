const router = require('express').Router();
const usersControllers = require('../../controllers/userController');
const { userValidate } = require('../../middlewares/validateMiddleware');

router.get('/users/me', usersControllers.getUserByIdAuth);

router.patch('/users/me', userValidate, usersControllers.updateUserNameAndAbout);

module.exports = router;
