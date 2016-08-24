var express = require('express');
var router = express.Router();

// As with any middleware it is quintessential to call next()
// if the user is authenticated
// var isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/');
// }

function verifyAuthencticated (req, res, next) {
	if (req.isAuthenticated()){
		req.flash("message", "Hi "+ req.user.firstName.S +", Welcome to Macedon!");
		next(null, {"success": "1"});
	} else {
		res.redirect("/login?rurl="+req.baseUrl);
	}
}

//protect urls from direct access 
// app.get("/api/devices", verifyAuthencticated, function (req, res) {
// 	res.json(['iphone', 'android']);
// });

/* GET Home Page */
/*
router.get('/', isAuthenticated, function(req, res){
  res.render('mainpage', { title: 'Express', user: req.user });
});
*/ 
 
// /* GET home page. */
router.get('/', verifyAuthencticated, function(req, res, next) {
  res.render('home', { message: req.flash("message"), warning: req.flash("warning") });

});
module.exports = router;

