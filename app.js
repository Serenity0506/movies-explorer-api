const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const allRouters = require('./routes/allRouters');
const { handleExceptions } = require('./middlewares/errorMiddleware');

const app = express();
const { requestLogger, errorLogger } = require('./middlewares/loggerMiddleware');

require('dotenv').config();

// console.log(process.env.NODE_ENV);

mongoose.connect('mongodb://158.160.103.67/bitfilmsdb', {});

app.use(helmet());

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3005',
  'https://api.movies.serenity0506.nomoredomains.work',
  'http://api.movies.serenity0506.nomoredomains.work',
];

app.use((req, res, next) => {
  const { origin } = req.headers;

  // console.log(origin);

  if (allowedCors.includes(origin)) {
    // console.log('all')
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(requestLogger);

app.use(allRouters);

app.use(errorLogger);

app.use(errors());

app.use(handleExceptions);

app.listen(3000);
