var express = require('express')
  , router = express.Router()
  , Comment = require('../models/users')
  , acl  = require('../lib/acl');

/* GET home page. */
router.get('/:rurl?', acl, function(req, res, next) {
	res.render('home/home', 
				{ 
					message: req.flash("message"), 
					warning: req.flash("warning"), 
					alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth" 
				}
			);
});

module.exports = router;