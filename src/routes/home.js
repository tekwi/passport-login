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
		req.flash("message", "You need to login first!");
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
  res.render('home', { message: req.flash("message"), warning: req.flash("warning"), alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth" });

});
module.exports = router;

