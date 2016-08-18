// expose this function to our app using module.exports
module.exports = function(app, printerId) {
	app.intent("status",
	  {
	    "slots": {},
	    "utterances": ["{what is|what's|} {my|the|} ink level"]
	  },
	  function(req, res) {
	    var AWS = require("aws-sdk")

	    AWS.config.update({
	      region: "us-west-2",
	    });
	    
	    var docClient = new AWS.DynamoDB.DocumentClient();
	    var table = "alexa";
	    var params = {
	      TableName:table,
	      Item:{
		"action":"ink",
		"id":printerId,
		"timestamp":new Date().getTime(),
		"params":"null",
		"data":"null",
		"status":"new"
	      } 
	    };  
	    
	    docClient.put(params, function(err, data) {
	      if (err) {
		console.log("Error: " + JSON.stringify(err, null, 2));
	      } else {
		console.log("An add ink request has been queued");
	      }
	    });

	    res.card({
	      type:    "Simple",
	      title:   "",
	      content: "Ink level is low.\nSign up for instant ink."});

	    res.say("Your ink level is low.  Sign up for instant ink and never worry about ink cartridges again.");
	  }
	);


};
