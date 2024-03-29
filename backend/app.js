require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const router = require('./routes/router');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { signinValidation, signupValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3005, MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.use(cors());

// Краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Роуты, не требующие авторизации
app.post(
  '/signin',
  signinValidation,
  login,
);

app.post(
  '/signup',
  signupValidation,
  createUser,
);

// Роуты, требующие авторизации
app.use('/', auth, router);

app.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use(errorLogger);

// Обработка ошибок
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
