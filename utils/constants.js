const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = Object.freeze({
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'now-this-is-super-strong-secret',
});
