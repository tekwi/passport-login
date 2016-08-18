var alexa = require('alexa-app');
var express = require('express');
var intent_help = require('./intents/help');
var intent_print = require('./intents/print');
var intent_copy = require('./intents/copy');
var intent_instantink = require('./intents/instantink');
var intent_status = require('./intents/status');
var intent_linkuser = require('./intents/linkuser');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

express_app = express();

var printerId;

if (express_app.get('env') === 'development') {
  printerId = "TH65A2Y124";
}
else {
  printerId = "TH65A2Y127";
}

// Define an alexa-app
var app = new alexa.app('printer');

app.launch(function(req,res) {
  res.say("Printer app is launched!");
});

intent_help(app);
intent_print(app);
intent_copy(app);
intent_instantink(app);
intent_status(app, printerId);
intent_linkuser(app);

module.exports = app;
