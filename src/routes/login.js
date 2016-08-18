var express = require('express');
var router = express.Router();

module.exports = function(passport){
 
  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message') });
  });
 
  /* Handle Login POST */
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));
 
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
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash : true 
  }));
 
  return router;
}

