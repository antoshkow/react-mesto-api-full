// Массив доменов, с которых разрешены кросс-доменные запросы
const ALLOWED_CORS = [
  'http://antoshkow.mesto.nomoredomains.club',
  'https://antoshkow.mesto.nomoredomains.club',
  'localhost:3000'
];

const corsHandler = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (ALLOWED_CORS.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    // res.header('Access-Control-Allow-Origin', origin);
    // устанавливаем заголовок, который разрешает браузеру запросы из любого источника
    res.header('Access-Control-Allow-Origin', "*");
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  // сохраняем список заголовков исходного запроса
  // const requestHeaders = req.headers['access-control-request-headers'];

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    // res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
};

// const corsOptions = (req, callback) => {
//   let corsOptions;
//   if (ALLOWED_CORS.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = {
//       credentials: true,
//       origin: true,
//     };
//   } else {
//     corsOptions = { origin: false };
//   }
//   callback(null, corsOptions);
// };

module.exports = {
  corsOptions,
  corsHandler,
};