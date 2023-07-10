const { BadRequestError } = require('../errors/BadRequestError');
const {NotFoundError} = require('../errors/NotFoundError');
const {UnauthorizedError} = require('../errors/UnauthorizedError');
const movie = require('../models/movieModel');
const { ValidationError, CastError } = require('mongoose').Error;

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
    trailer, 
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
    trailer, 
    nameRU, 
    nameEN, 
    thumbnail, 
    movieId,
    }).then((movie) => res.status(201).send(movie))
    .catch((err) => {
      console.log(err);
      if (err instanceof ValidationError) {
        return next(
          new BadRequestError('Переданы некорректные данные'),
        );
      }
      return next(err);
    });
}

const deleteMovie = (req, res, next) => {
    movie.findById(req.params._id)
      .then((movie) => {
        if(!movie) {
            throw new NotFoundError('Фильм не найден');
        } else if (movie.owner.toString() !== req.user._id) {
            throw new UnauthorizedError('Не положено удалять чужие фильмы');
        } else {
            movie.deleteOne().then(() => res.send(movie));
        }
      }).catch((err) => {
        if (err instanceof CastError) {
          return next(new BadRequestError('Передан некорректный id фильма'));
        }
        return next(err);
      });
};

module.exports = {
    deleteMovie,
    postMovie,
    getMovies,
}
