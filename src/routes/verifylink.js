var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var AWS = require("aws-sdk")
  
  AWS.config.update({
    region: "us-west-2",
  });
  
  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "linked_users";
  var params = {
    "TableName":table,
    "IndexName":'serial-index',
    KeyConditionExpression: "serial = :serial",
    ExpressionAttributeValues: {
      ":serial": req.query["id"]
    }
  }
    
  console.log("Requesting an " + req.query['id'] + " from table " + table);
  
  docClient.query(params, function(err, data) {
    if (err) {
      res.send("error: " + JSON.stringify(err, null, 2));
    } else {
      x = JSON.parse(JSON.stringify(data, null, 2));
      console.log(x);
      res.send('user: ' + x.Items[0].userId);
    }
  });
});

module.exports = router;
