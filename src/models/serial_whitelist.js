//dynamodb model
var DynamoDBModel = require('dynamodb-model');
//aws connection
var awsConfig	  = require('../lib/awsconfig');

var tableSchema = new DynamoDBModel.Schema({
  id: {
    type: String,
    key: 'hash'
  }
});

// create a model using the name of the DynamoDB table and a schema 
/**
 * serialwhiteTable Db Model instance
 * @type {DynamoDBModel}
 * options are: table name, table schema and awsConfig
 */
var serialwhiteTable = new DynamoDBModel.Model('serial_whitelist', tableSchema, awsConfig);

var Serial = {}; 

// Create new row
Serial.create = function(input, cb) {
	serialwhiteTable.putItem(input, function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item);
	})
}

// Get a particular row
Serial.get = function(input, cb) {
	serialwhiteTable.getItem(input, function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item);
	})
}

// Get all rows
Serial.getAll = function(cb) {
	serialwhiteTable.scan(function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item)
	})
}


module.exports = Serial;