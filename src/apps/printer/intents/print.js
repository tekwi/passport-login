// expose this function to our app using module.exports
module.exports = function (app) {
	app.intent("print",
		{
			"slots": { "SUBJECT": "LITERAL", "TYPE": "PRINT_TYPE" },
			"utterances": [
				"print {a|an} {-|TYPE} {of|about} {a|an} {cats|civil war|john fitzgerald kennedy|dion wessler|dogs|meg whitman|hp logo|vancouver|mount saint helens|bmw|SUBJECT}"
			]
		},
		function (req, res) {
			var subject = req.slot('SUBJECT');
			var print_type = req.slot('TYPE');

			res.card({
				type: "Simple",
				title: "",
				content: "Tried to print."
			});

			if (print_type == "photo" || print_type == "picture") {
				var Bing = require('node-bing-api')({ accKey: "vCSY1wZ97z0t1PctAbQHmB1FQR2wUQ2qSJVij2tMT3g" });

				Bing.images(subject, { top: 1, adult: 'Strict' }, function (err, res, body) {
					console.log(subject + ": " + body.d.results[0].MediaUrl);

					if (body.d.results.length > 0) {
						var url = body.d.results[0].MediaUrl;

						var AWS = require("aws-sdk")

						AWS.config.update({
							region: "us-west-2",
						});


						var docClient = new AWS.DynamoDB.DocumentClient();

						var get_params = {
							TableName: "linked_users",
							Key: {
								"userId": req.userId
							}
						};

						docClient.get(get_params, function (err, data) {
							if (err) {
								console.log("Error trying to queue a print: " + JSON.stringify(err, null, 2));
							} else {
								x = JSON.parse(JSON.stringify(data, null, 2));
								console.log(x);
								if (x.Item.length != 0) {
									var table = "alexa";
									var params = {
										TableName: table,
										Item: {
											"action": "print",
											"id": x.Item.serial,
											"timestamp": new Date().getTime(),
											"params": url,
											"data": "null",
											"status": "new"
										}
									};

									console.log("SessionDetails: " + req.sessionDetails);
									i = JSON.parse(JSON.stringify(data, null, 2));
									console.log(x);
									if (x.Item.length != 0) {
										console.log("Trying to queue a print " + table);

										docClient.put(params, function (err, data) {
											if (err) {
												console.log("Error trying to queue a print: " + JSON.stringify(err, null, 2));
											} else {
												console.log("A print command has been queued");
											}
										});
									}
								}
							}
						});
					}

				});
				res.say("Attempting to print a " + print_type + " of " + subject);
			}
			else {
				res.say("Sorry, but I didn't understand what you wanted to print.");
			}

		});


};

