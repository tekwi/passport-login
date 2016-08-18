// expose this function to our app using module.exports
module.exports = function(app) {
	app.intent("TurnOff",
	  {
	    "slots":{},// {lights},
	    "utterances": ["turn off light", "turn light off", "light off", "turn off lamp", "turn lamp off"]//TODO: How to add slots
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
		"action":"off",
		"id":"1"
	      } 
	    };  
	    
	    docClient.put(params, function(err, data) {
	      if (err) {
		console.log("Error: " + JSON.stringify(err, null, 2));
	      } else {
		console.log("A request to turn off the light has been added");
	      }
	    });

	    res.card({
	      type:    "Simple",
	      title:   "",
	      content: "We are turning off the light of your device"});

	    res.say("We are turning off the light of your device");
	  }
	);


};
