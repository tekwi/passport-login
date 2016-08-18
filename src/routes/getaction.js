var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var AWS = require("aws-sdk")

  AWS.config.update({
    region: "us-west-2",
  });

  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "alexa";
  var params = {
    TableName: table,
    KeyConditionExpression: "id = :serial",
    ExpressionAttributeValues: {
      ":serial": req.query["id"]
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

        res.send(x.Items[0].action + "," + x.Items[0].params);

        docClient.delete(del_params, function (err, data) {
          if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
          }
        });
      }
      else {
        res.send("ok");
      }
    }
  });
});

module.exports = router;
