const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  let status = 500;

  switch (err.name) {
    case 'ValidationError': // Работает и на joi и на mongoose 😎
      status = 400;
      break;
    case 'JsonWebTokenError':
      status = 401;
      break;
    case 'TokenExpiredError':
      status = 401;
      break;
    case 'HttpError':
      status = err.status;
      break;
    default:
      console.error(err);
      break;
  }

  res.status(status).json({ message: err.message });
});

module.exports = app;
