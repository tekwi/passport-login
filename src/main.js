var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var verifier = require('alexa-verifier');


var homepage = require('./routes/home');
var faq = require('./routes/faq');
var users = require('./routes/users');
var auth = require('./routes/auth');
var getauth = require('./routes/getauth');
var getaction = require('./routes/getaction');
var getlight = require('./routes/getlight');
var temp = require('./routes/temp');
var reqlink = require('./routes/reqlink');
var verifylink = require('./routes/verifylink');
var expressSession = require('express-session');
var passport = require('passport');

var passportDb = require('./lib/passport-dynamodb');
var login = require('./routes/login')(passport);
var logout = require('./routes/logout');
var app = express();

var options = {
	AWSConfigJSON: {
		region: 'us-west-2',
		correctClockSkew: true
	},
	reapInterval: 600000
};

DynamoDBStore = require('connect-dynamodb')({session: expressSession});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ store: new DynamoDBStore(options), secret: 'the company that bill and dave built', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passportDb(passport);

var flash = require('connect-flash');
app.use(flash());

var alexa_app = require('./apps/printer');
var home_app = require('./apps/home');
home_app.express(app, "/alexa/");
alexa_app.express(app, "/alexa/");

app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log(app.get('env'));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
