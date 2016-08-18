// expose this function to our app using module.exports
module.exports = function(app) {
	app.intent("help",
	  {
	    "slots": {},
	    "utterances":[ "help" ]
	  },
	  function(req, res) {
	    res.say("You can say something like make a copy");
	  }
	);
};
