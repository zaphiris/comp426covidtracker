var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var passport = require('passport');
const jwt = require('express-jwt')
var path = require('path');
var cors = require('cors');
const bodyParser = require('body-parser');

// use it before all route definitions


var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
var indexRouter = require('./routes/index');
var authRouter = require('./routes/authentication');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://mzap97:hZi0Ho39GgX61xgj@cluster0-mcknc.gcp.mongodb.net/test?retryWrites=true&w=majority';


var db;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  if (err) throw err;
  db = client.db('Covid19Comp426');
  app.set('db', db);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/authentication', authRouter);
app.use('/', indexRouter);

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
