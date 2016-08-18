var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var AWS = require("aws-sdk")

  AWS.config.update({
    region: "us-west-2",
  });

  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "home_cmdq";
  var params = {
    TableName: table,
    KeyConditionExpression: "id = :serial",
    ExpressionAttributeValues: {
      ":serial": "1"
    }
  };

  console.log("Requesting an item from table " + table);

  docClient.query(params, function (err, data) {
    if (err) {
      res.send("error: " + JSON.stringify(err, null, 2));
    } else {
      x = JSON.parse(JSON.stringify(data, null, 2));
      
      if (x.Items.length != 0) {
        var del_params = {
          TableName: table,
          Key: {
            "id": req.query["id"]
          }
        };

        res.send(x.Items[0].action);

       
      }
      else {
        res.send("ok");
      }
    }
  });
});

module.exports = router;
