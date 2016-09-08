var express = require('express')
    , router = express.Router()
    , uuid = require('node-uuid')
    , acl  = require('.././lib/acl')
    , Authcodes = require('../models/authcodes');

/* GET users listing. */
router.get('/:code?/:scope?', acl, function(req, res, next) {
  
  if (req.query.code) { 
      
      var input_params = {
                          "code":req.query.code,
                          "timestamp":new Date().getTime(),
                          "id":req.user.serial,
                          "user": req.user.id
                         };
        // insert data into authcodes table                
        Authcodes.create(input_params,function (err, items) {
          if (err) {
            res.send("error: " + JSON.stringify(err, null, 2));
          } else {
            //req.session.destroy(function(err){});
            req.flash("info", "Congratulations "+ req.user.firstName+", you are now registered and ready to use voice-enabled printer.");
            res.render("admin/", { redirect_url: null
                                   , redirect_message : null 
                                   , alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth"
                                   , info : req.flash("info")
                                   , warning: null
                                   , danger: null
                                  })
          }
        })
  }else{
      req.flash("warning", "Authorization failed. Please try again!");
      res.render("admin", { redirect_url: null
                            , redirect_message : null 
                            , alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth"
                            , info : null
                            , warning: req.flash("warning")
                            , danger: null
                          });
  }
  });

module.exports = router;
