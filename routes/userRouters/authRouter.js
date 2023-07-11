const router = require('express').Router();
const { signInValidate, signUpValidate } = require('../../middlewares/validateMiddleware');
const authControllers = require('../../controllers/authController');

router.post('/signin', signInValidate, authControllers.login);
router.post('/signup', signUpValidate, authControllers.createUser);

module.exports = router;
