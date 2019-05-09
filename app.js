const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const domain = require('express-domain-middleware');
const bcrypt = require('bcrypt');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const register = require('./routes/register');
const comment = require('./routes/comment');
const login = require('./routes/login');
const logout = require('./routes/logout');
const newmap = require('./routes/newmap');
const viewmap = require('./routes/viewmap');
const editmap = require('./routes/editmap');
const find = require('./routes/find');
const mypage = require('./routes/mypage');

const app = express();

app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(domain);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', register);
app.use('/comment', comment);
app.use('/login', login);
app.use('/logout', logout);
app.use('/newmap', newmap);
app.use('/viewmap', viewmap);
app.use('/editmap', editmap);
app.use('/find', find);
app.use('/mypage', mypage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
