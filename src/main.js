var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var verifier = require('alexa-verifier');

//var routes = require('./routes/index');
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
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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

//app.use('/', routes);
// app.use('/home', homepage);
// app.use('/faq', faq);
// app.use('/users', users);
// app.use('/auth', auth);
// app.use('/getauth', getauth);
// app.use('/getaction', getaction);
// app.use('/getlight', getlight);
// app.use('/temp', temp);
// app.use('/reqlink', reqlink);
// app.use('/verifylink', verifylink);
// app.use('/logout', logout);
// app.use('/', login);
// app.use('/redirect', login);



var alexa_app = require('./apps/printer');
var home_app = require('./apps/home');
home_app.express(app, "/alexa/");
alexa_app.express(app, "/alexa/");
//console.log(alexa_app.schema());
//console.log(alexa_app.utterances());

/*
app.use (req, res, next) ->
  if not req.headers.signaturecertchainurl
    return next()
  # mark the request body as already having been parsed so it's ignored by
  # other body parser middlewares
  req._body = true

  req.rawBody = ''
  req.on 'data', (data) ->
    req.rawBody += data
  req.on 'end', ->
    try
      req.body = JSON.parse req.rawBody
    catch er 
      req.body = {}

    cert_url  = req.headers.signaturecertchainurl
    signature = req.headers.signature
    requestBody = req.rawBody
    verifier cert_url, signature, requestBody, (er) ->
      if er 
        console.error 'error validating the alexa cert:', er
        res.status(401).json { status: 'failure', reason: er }
      else
        next()
*/
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
    res.render('error', {
      message: err.message,
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
