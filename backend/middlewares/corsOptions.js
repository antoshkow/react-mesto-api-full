// Массив доменов, с которых разрешены кросс-доменные запросы
const ALLOWED_CORS = [
  'http://antoshkow.mesto.nomoredomains.club',
  'https://antoshkow.mesto.nomoredomains.club',
  'localhost:3000'
];

const corsOptions = (req, callback) => {
  let corsOptions;
  if (ALLOWED_CORS.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      credentials: true,
      origin: true,
    };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports = corsOptions;
