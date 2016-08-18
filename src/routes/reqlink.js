var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  var AWS = require("aws-sdk")
  var code = Math.floor(Math.random() * 9000) + 1000;
  var serial = req.query["id"];
  
  AWS.config.update({
    region: "us-west-2",
  });

  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "linkcodes";
  var params = {
    TableName:table,
    Item:{
      "serial":serial,
      "timestamp":new Date().getTime(),
      "id":code    
    } 
  };  

  docClient.put(params, function(err, data) {
    if (err) {
      res.send("error: " + JSON.stringify(err, null, 2));
    } else {
			if (express_app.get('env') === 'development') {
				res.send("tell rosie my authentication code is " + code);
			}
			else {
				res.send("tell printer my authentication code is " + code);
			}
    }
  });

});

module.exports = router;
