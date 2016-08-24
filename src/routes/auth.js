var express = require('express')
    , router = express.Router()
    , uuid = require('node-uuid');

/* GET users listing. */
router.get('/:code?/:scope?', function(req, res, next) {
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
      "id":uuid.v4(),
      "user": "test" 
    } 
  };  
  if (req.query.code) { 
    docClient.put(params, function(err, data) {
      if (err) {
        res.send("error: " + JSON.stringify(err, null, 2));
      } else {
        //req.session.destroy(function(err){});
        req.flash("message", "Congratulations, you are now registered and ready to use voice-enabled printer.");
        res.render("home", {message : req.flash("message"), warning: req.flash("warning")});
      }
    });
  }else{
      req.flash("warning", "Authorization failed. Please try again!");
      res.render("home", {message : req.flash("message"), warning: req.flash("warning")});
      //res.send("Authcode not valid.");
  }
    // res.send("Success! You are now ready to talk to MACEDON!");
  });


module.exports = router;
