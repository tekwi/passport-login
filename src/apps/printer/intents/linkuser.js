// expose this function to our app using module.exports
module.exports = function (app) {
	app.intent("linkuser",
		{
			"slots": { "code": "NUMBER" },
			"utterances": [
				"my authentication code is {1000-9999 by 763 |code}"
			]
		},
		function (req, res) {
			var code = req.slot('code');

			res.card({
				type: "Simple",
				title: "",
				content: "Linking user account."
			});

			var AWS = require("aws-sdk")

			AWS.config.update({
				region: "us-west-2",
			});

			var docClient = new AWS.DynamoDB.DocumentClient();
			var table = "linkcodes";
			var params = {
				TableName: table,
				KeyConditionExpression: "id = :code",
				ExpressionAttributeValues: {
					":code": Number(code)
				}
			};

			docClient.query(params, function (err, data) {
				if (err) {
					console.log("error: " + JSON.stringify(err, null, 2));
				} else {

					x = JSON.parse(JSON.stringify(data, null, 2));
					console.log(x);
					if (x.Items.length != 0) {
						var put_params = {
							TableName: "linked_users",
							Item: {
								"serial": x.Items[0].serial,
								"userId": req.userId,
								"timestamp": new Date().getTime()
							}
						};

						docClient.put(put_params, function (err, data) {
							if (err) {
								console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
							} else {
								console.log("PutItem succeeded:", JSON.stringify(data, null, 2));
								var del_params = {
									TableName: table,
									Key: {
										"id": Number(code)
									}
								}

								docClient.delete(del_params, function (err, data) {
									if (err) {
										console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
									} else {
										console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));

									}
								});

							};


							console.log("user id is " + req.userId);

						});

						res.say("your authentication code is " + code);
					}
				}
			});
		}
	);
};

