var express = require('express');
var router = express.Router();

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

/* GET Home Page */
/*
router.get('/', isAuthenticated, function(req, res){
  res.render('mainpage', { title: 'Express', user: req.user });
});
*/ 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
module.exports = router;
