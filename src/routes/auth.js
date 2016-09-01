var express = require('express')
    , router = express.Router()
    , uuid = require('node-uuid')
    , acl  = require('.././lib/acl');

/* GET users listing. */
router.get('/:code?/:scope?', acl, function(req, res, next) {
  var AWS = require("aws-sdk")
  
  AWS.config.update({
    region: "us-west-2",
  });
  
  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "authcodes";
  var params = {
    TableName:table,
    Item:{
      "code":req.query.code,
      "timestamp":new Date().getTime(),
      "id":req.user.serial.S,
      "user": req.user.id.N
    } 
  };  
  if (req.query.code) { 
    docClient.put(params, function(err, data) {
      if (err) {
        res.send("error: " + JSON.stringify(err, null, 2));
      } else {
        //req.session.destroy(function(err){});
        req.flash("message", "Congratulations "+ req.user.firstName.S +", you are now registered and ready to use voice-enabled printer.");
        res.render("home", {message : req.flash("message"), warning: req.flash("warning"), alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth"});
      }
    });
  }else{
      req.flash("warning", "Authorization failed. Please try again!");
      res.render("home", {message : req.flash("message"), warning: req.flash("warning"), alexa_oauth : "https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.4f40bfef768c4087ab37f25ead297561&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%7B%22productID%22%3A%22macedon%22,%22productInstanceAttributes%22%3A%7B%22deviceSerialNumber%22%3A%20%22TH65A2Y124%22%7D%7D%7D&response_type=code&redirect_uri=https%3A%2F%2F"+ req.headers.host +"/auth"});
      //res.send("Authcode not valid.");
  }
    // res.send("Success! You are now ready to talk to MACEDON!");
  });


module.exports = router;
