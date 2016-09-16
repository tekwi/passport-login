
module.exports = function(req,res,next) {
		if (req.isAuthenticated()){
			if(req.session.login){
				req.session.login_message = null;
			}else{
				req.session.login = 1;
				req.session.login_message = "Hi "+ req.user.firstName + ", Welcome to Macedon!";
			}
			next(null, {"success": "1"});
		} else {
			req.flash("message", "You need to login first!");
			res.redirect("/login?rurl="+req.baseUrl);
		}
}