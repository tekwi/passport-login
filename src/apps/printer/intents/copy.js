// expose this function to our app using module.exports
module.exports = function (app) {
	app.intent("copy",
		{
			"slots": { "NumCopies": "NUMBER", "CopyColorChoice": "COPY_TYPE" },
			"utterances": [
				"make a copy",
				"make a {-|CopyColorChoice} copy",
				"make {1-10|NumCopies} {-|CopyColorChoice} {copy|copies}",
				"make {1-10|NumCopies} {copy|copies}"
			]
		},
		function (req, res) {
			var AWS = require("aws-sdk")
			var speechTest;

			AWS.config.update({
				region: "us-west-2",
			});

			var num_copies;
			if (req.slot('NumCopies')) {
				num_copies = req.slot('NumCopies');
				speech_text = "Making " + num_copies + " copies"
			}
			else {
				num_copies = 1;
				speech_text = "Making a copy"
			}

			var num_copies;
			if (req.slot('CopyColorChoice')) {
				copy_type = req.slot('CopyColorChoice');
			}
			else {
				copy_type = 1;
			}

			var get_params = {
				TableName: "linked_users",
				Key: {
					"userId": req.userId
				}
			};
						var docClient = new AWS.DynamoDB.DocumentClient();

                        console.log(get_params);
			docClient.get(get_params, function (err, data) {
				if (err) {
					console.log("Error trying to queue a copy: " + JSON.stringify(err, null, 2));
				} else {
					x = JSON.parse(JSON.stringify(data, null, 2));
					console.log(x);
					if (x.Item.length != 0) {
						var table = "alexa";
						var params = {
							TableName: table,
							Item: {
								"action": "copy",
								"id": x.Item.serial,
								"timestamp": new Date().getTime(),
								"params": num_copies + ',' + copy_type,
								"data": "null",
								"status": "new"
							}
						};

						console.log("Trying to queue a copy " + table);

						docClient.put(params, function (err, data) {
							if (err) {
								console.log("Error trying to queue a copy: " + JSON.stringify(err, null, 2));
							} else {
								console.log("A copy command has been queued");
							}
						});
					}
				}

				res.card({
					type: "Simple",
					title: "",
					content: "Made a copy."
				});

				res.say(speech_text);
			});
		});
};
