const { NODE_ENV, JWT_SECRET } = process.env;

const UrlDataBase = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = Object.freeze({
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'now-this-is-super-strong-secret',
  UrlDataBase,
});
