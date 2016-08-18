// expose this function to our app using module.exports
module.exports = function(app) {
	app.intent("getTemp",
	  {
	    "slots":{},
	    "utterances": ["what is the temperature", "whats the temperature", "what is the temp", "what temp is it", "what temperature is it", "what temperature is it in this room"]//TODO: How to add slots
	  },
	  function(req, res) {
	    var AWS = require("aws-sdk")

	    AWS.config.update({
	      region: "us-west-2",
	    });
	    
	    var docClient = new AWS.DynamoDB.DocumentClient();
	    var table = "temperature";
            var curTemp = -1;
	    var params = {
	      TableName:table,
	      KeyConditionExpression: 'id = :serial',
	      ExpressionAttributeValues: {
		':serial': '1'
	      } 
	    };  
	    
	    docClient.query(params, function(err, data) {
              if (err) {
                console.log("Error: " + JSON.stringify(err, null, 2));
              } else {
                x = JSON.parse(JSON.stringify(data, null, 2));
  
                if (x.Items.length != 0) {
                  curTemp = x.Items[0].temp;
                }
                res.card({
	          type:    "Simple",
	          title:   "",
	          content: "The temperature is " + curTemp + " degrees"}).send();

	        res.say("The temperature is " + curTemp + "  degrees").send();
              }
            });
	    return false;
	  }
	);


};
