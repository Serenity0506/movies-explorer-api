const {NotFoundError} = require('../errors/NotFoundError');
const {UnauthorizedError} = require('../errors/UnauthorizedError');
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
    .catch(next);
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
      }).catch(next);
};

module.exports = {
    deleteMovie,
    postMovie,
    getMovies,
}
