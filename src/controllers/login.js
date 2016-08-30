var express = require('express');
var router = express.Router();

module.exports = function(passport){
  
 /* GET login page. */
  router.get('/', function(req, res) {
      // res.render('redirect', { redirect_url : '/register', message: "Redirecting to Amazon - Alexa Voice Services ..."});
      res.render('index', { message: req.flash('message') });
  });
    
  router.get('/login', function(req, res) {
      res.render('index', { message: req.flash('message') });
  });
  
  /* Redirect view */  
  router.get('/redirect', function (req, res) {
    res.render('redirect', { seconds: 2, redirect_url : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F" + req.headers.host + "/auth", message: "Redirecting to Amazon - Alexa Voice Services ..."});
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home/',
    failureRedirect: '/failure',
    failureFlash : true 
  }));
 
  /* GET login failure page. */
  router.get('/failure', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message')});
  })

  /* GET Registration Page */
  router.get('/autoregister', function(req, res){
    res.render('autoregister');
  });

  /* GET Registration Page */
  router.get('/register', function(req, res){
    res.render('register',{message: req.flash('message')});
  });
 
  /* Handle Registration POST */
  router.post('/register', passport.authenticate('local-signup', {
   successRedirect: '/redirect',
// successRedirect: 'https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2Fwww.printstacks.com/auth',
// successRedirect: 'https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.34e3102618564b9c93931ab6751b899a&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22TEKWI_VOICE%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2Ftest.printstacks.com',
    failureRedirect: '/register',
    failureFlash : true 
  }));
 
  return router;
}

