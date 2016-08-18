var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var AWS = require("aws-sdk")
  
  AWS.config.update({
    region: "us-west-2",
  });
  
  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "authcodes";
  var params = {
    TableName:table,
    Item:{
      "code":req.query["code"],
      "timestamp":new Date().getTime(),
      "id":req.query["state"]      
    } 
  };  
  console.log("Adding an item to table " + table);
  
  docClient.put(params, function(err, data) {
    if (err) {
      res.send("error: " + JSON.stringify(err, null, 2));
    } else {
      res.send("Congratulations, you are now registered and ready to use voice-enabled printer.");
    }
  });
});

module.exports = router;
