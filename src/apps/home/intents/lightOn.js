// expose this function to our app using module.exports
module.exports = function(app) {
	app.intent("TurnOn",
	  {
	    "slots":{},// {lights},
	    "utterances": ["turn on light", "turn light on", "light on", "turn on lamp", "turn lamp on"]//TODO: How to add slots
	  },
	  function(req, res) {
	    var AWS = require("aws-sdk")

	    AWS.config.update({
	      region: "us-west-2",
	    });
	    
	    var docClient = new AWS.DynamoDB.DocumentClient();
	    var table = "home_cmdq";
	    var params = {
	      TableName:table,
	      Item:{
		"action":"on",
		"id":"1"
	      } 
	    };  
	    
	    docClient.put(params, function(err, data) {
	      if (err) {
		console.log("Error: " + JSON.stringify(err, null, 2));
	      } else {
		console.log("A request to turn on the light has been added");
	      }
	    });

	    res.card({
	      type:    "Simple",
	      title:   "",
	      content: "We are turning on the light of your device"});

	    res.say("We are turning on the light of your device");
	  }
	);


};
