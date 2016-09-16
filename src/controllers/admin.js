var express = require('express')
  , router = express.Router()
  , Users = require('../models/users')
  , acl  = require('../lib/acl');

router.get('/', acl, function(req, res) {
    res.render('admin/index', {  redirect_url: null
    						   , redirect_message : null 
    						   , alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth"
    						   , info : req.session.login_message
    						   , warning: null
    						   , danger: null
    						  })
})

router.get('/redirect', acl, function(req, res) {
    // res.render('admin/index')
	res.render('admin/index', { seconds: 5 
								, redirect_url : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F" + req.headers.host + "/auth"
								, redirect_message: "Redirecting to Amazon - Alexa Voice Services in "
								, alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth"
								, info : null
								, warning: null
								, danger: null
							})
})

router.get('/table', function(req, res) {
    res.render('admin/table');
})

router.get('/form', function(req, res) {
    res.render('admin/form')
})

router.get('/charts', function(req, res) {
    res.render('admin/charts')
})

// Handle get req to /users  
router.get('/users', acl, function(req, res) {
   Users.getAll(function (err, user) {
    res.render('admin/users',{users: user});
  })
});

// Handle get req to /users  
router.post('/users', acl, function(req, res) {

  if(req.body.action == "disable-user") {   
    var input = {"email" : req.body.key};
    var updates = {"status" : 2};
    Users.update(input, updates,function (err) {
      res.json("Disable Success");
    }); 
  }
  if(req.body.action == "reset-user") {   
    var input = {"email" : req.body.key};
    var updates = {"status" : 3};
    Users.update(input, updates,function (err) {
      res.json("Reset Success");
    });
  }
  
});

// Handle get req to /users  
router.delete('/users', acl, function(req, res) {
    var input = {"email" : req.body.key};
    if(req.body.key != req.user.email){
      Users.delete(input,function (err) {
        res.json("Delete Success");
      });
    }else{
      res.json("Self Delete not allowed");
    }
});


module.exports = router