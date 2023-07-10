const router = require('express').Router();
const movieControllers = require('../controllers/movieController');
const { movieValidate, movieByIdValidate } = require('../utils/validators');

router.get('/movies', movieControllers.getMovies);

router.post('/movies', movieValidate, movieControllers.postMovie);

router.delete('/movies/_id', movieByIdValidate, movieControllers.deleteMovie);

module.exports = router;