
module.exports = function(req,res,next) {
		if (req.isAuthenticated()){
			req.flash("message", "Hi "+ req.user.firstName.S + ", Welcome to Macedon!");
			next(null, {"success": "1"});
		} else {
			req.flash("message", "You need to login first!");
			res.redirect("/login?rurl="+req.baseUrl);
		}
}