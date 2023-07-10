const { Schema } = require('mongoose');
const validator = require('validator');
const { validateUrl } = require('../utils/validators');

const movieSchema = new Schema({
    country: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        required: true,
        type: String,
        validate: {
          validator: validateUrl,
          message: (props) => `${props.value} 'Некорректный адрес ссылки'`,
        },
    },
    trailerLink: {
        required: true,
        type: String,
        validate: {
          validator: validateUrl,
          message: (props) => `${props.value} 'Некорректный адрес ссылки'`,
        },
    },
    thumbnail: {
        required: true,
        type: String,
        validate: {
          validator: validateUrl,
          message: (props) => `${props.value} 'Некорректный адрес ссылки'`,
        },
    },
    owner: {
        required: true,
        type: Number,
        ref: 'user'
    },
    movieId: {
        required: true,
        type: Number,
    },
    nameRU: {
        required: true,
        type: String,
    },
    nameEN: {
        required: true,
        type: String,
    },
});
