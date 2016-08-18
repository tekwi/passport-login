var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  var AWS = require("aws-sdk")
  var serial = req.query["id"];
  var temperature = req.query["temp"];
  
  AWS.config.update({
    region: "us-west-2",
  });

  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "temperature";
  var params = {
    TableName:table,
    Item:{
      "id":serial,
      "temp":temperature    
    } 
  };  

  docClient.put(params, function(err, data) {
    if (err) {
      res.send("error: " + JSON.stringify(err, null, 2));
    } else {
			if (express_app.get('env') === 'development') {
				res.send("The current temperature is being set to " + temperature);
			}
			else {
				res.send("The current temperature is being set to " + temperature);
			}
    }
  });

});

module.exports = router;
