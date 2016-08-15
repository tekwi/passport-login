var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var passport = require("passport");
var passportLocal = require("passport-local");

var app = express();
app.set("view engine", "ejs");

// configure express session
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(expressSession({ 
		secret: process.env.SESSION_SECRET || 'secret',   
		resave: true,
    	saveUninitialized: true
    }));

//init passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function (username, password, done) {
	if (username === 'sam') {
		done(null, {id: username, name: username});
	}else {
		done(null, null);
	}
}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id ,done) {
	done(null, {id: id, name: id});
});
// action methods
app.get("/", function (req, res) {
	res.render("index", {
		isAuthenticated : req.isAuthenticated(),
		user: req.user
	});
});

app.get("/login", function (req,res){
	res.render("login");
});

//where passport takes over post req
 app.post("/login/:rurl?", passport.authenticate("local"), function (req, res) {
 	console.log(req.query.rurl);
 	if (req.query.rurl) {
 		res.redirect("/api/devices");
 	}else {
 		res.redirect("/");
 	}

 });

 app.get("/logout", function (req, res) {
 	req.logout();
 	res.redirect("/");
 });

function verifyAuthencticated (req, res, next) {
	if (req.isAuthenticated()){
		next(null, {"success": "1"});
	} else {
		res.redirect("/login?rurl="+req.url);
	}
}

//protect urls from direct access 
app.get("/api/devices", verifyAuthencticated, function (req, res) {
	res.json(['iphone', 'android']);
});

var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log("server running on localhost" + port);
});