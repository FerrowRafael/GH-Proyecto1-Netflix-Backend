const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movie');
// const ordersRouter = require('./routes/order');
const citiesRouter = require('./routes/city');
const genresRouter = require('./routes/genre');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
// app.use('/orders', ordersRouter);
app.use('/cities', citiesRouter);
app.use('/genres', genresRouter);

module.exports = app;
