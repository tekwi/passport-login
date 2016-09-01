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
    Key:{
      "serial":req.query["serial"]      
    } 
  };  
  console.log("Requesting an item from table " + table);
  
  docClient.get(params, function(err, data) {
    if (err) {
      res.send("error: " + JSON.stringify(err, null, 2));
    } else {
      x = JSON.parse(JSON.stringify(data, null, 2));
      res.send(x.Item.code);
    }
  });
});

module.exports = router;
