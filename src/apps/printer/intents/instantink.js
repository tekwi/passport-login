// expose this function to our app using module.exports
module.exports = function(app) {
	app.intent("instantink",
	  {
	    "slots": {},
	    "utterances":[ 
	      "about instant ink",
	      "what is instant ink",
	      "instant ink"
	    ]
	  },
	  function(req, res) {
	    res.say("HP Instant Ink is an ink replacement service, you select your plan and we take care of the rest. You’ll never run out of ink and printing will cost a lot less.  Visit hp.com to find out more.");
	  }
	);


};

