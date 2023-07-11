const { NotFoundError } = require('../errors/NotFoundError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const movie = require('../models/movieModel');

const getMovies = (req, res, next) => {
  movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user._id;

  movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  }).then((m) => res.status(201).send(m))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  movie.findById(req.params._id)
    .then((mov) => {
      if (!mov) {
        throw new NotFoundError('Фильм не найден');
      } else if (mov.owner.toString() !== req.user._id) {
        throw new UnauthorizedError('Не положено удалять чужие фильмы');
      } else {
        mov.deleteOne().then(() => res.send(mov));
      }
    }).catch(next);
};

module.exports = {
  deleteMovie,
  postMovie,
  getMovies,
};
