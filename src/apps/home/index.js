var alexa = require('alexa-app');
var express = require('express');
var intent_lightOn = require('./intents/lightOn');
var intent_lightOff = require('./intents/lightOff');
var intent_getTemp = require('./intents/getTemp');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

express_app = express();


// Define an alexa-app
var app = new alexa.app('home');

app.launch(function(req,res) {
  res.say("Home skill is launched!");
});


intent_lightOn(app);
intent_lightOff(app);
intent_getTemp(app);

module.exports = app;
