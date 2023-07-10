const router = require('express').Router();
const usersRouter = require('./usersRouter');
const movieRouter = require('./movieRouter')
const authRouter = require('./authRouter');
const { NotFoundError } = require('../errors/http/NotFoundError');
const auth = require('../middlewares/authMiddleware');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(authRouter);
router.use(auth.checkToken);
router.use(usersRouter);
router.use(movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
