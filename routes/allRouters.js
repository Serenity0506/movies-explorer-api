const router = require('express').Router();
const userRouter = require('./userRouters/userRouter');
const movieRouter = require('./userRouters/movieRouter');
const authRouter = require('./userRouters/authRouter');
const { NotFoundError } = require('../errors/NotFoundError');
const auth = require('../middlewares/authMaddleware');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(authRouter);
router.use(auth.checkToken);
router.use(userRouter);
router.use(movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
