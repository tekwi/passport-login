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

var tableName = "serial_whitelist";
// create a model using the name of the DynamoDB table and a schema 
/**
 * serialwhiteTable Db Model instance
 * @type {DynamoDBModel}
 * options are: table name, table schema and awsConfig
 */

var Serial = {}; 

// Create new row
Serial.create = function(input, cb) {

	var serialwhiteTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

	serialwhiteTable.putItem(input, function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item);
	})
}

// Get a particular row
Serial.get = function(input, cb) {
	var serialwhiteTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

	serialwhiteTable.getItem(input, function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item);
	})
}

// Get all rows
Serial.getAll = function(cb) {
	var serialwhiteTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);
	
	serialwhiteTable.scan(function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item)
	})
}


module.exports = Serial;