//dynamodb model
var DynamoDBModel = require('dynamodb-model');
//aws connection
var awsConfig	  = require('../lib/awsconfig');

var tableSchema = new DynamoDBModel.Schema({
  id: {
    type: Number,
    key: 'hash'
  },
  email: String,
  firstName: String,
  lastName: String,
  pw: String,
  serial: String
});

var tableName = "user";

// create a model using the name of the DynamoDB table and a schema 
/**
 * usersTable Db Model instance
 * @type {DynamoDBModel}
 * options are: table name, table schema and awsConfig
 */

var Users = {}; 

// Create new row
Users.create = function(input, cb) {
	var usersTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

	usersTable.putItem(input, function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item);
	})
}

// Get a particular row
Users.get = function(input, cb) {
	var usersTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

	usersTable.getItem(input, function (err, item, response) {
		if(err){
			cb(err);
		}else
			cb(null, item);
	})
}

// Get all rows
Users.getAll = function(cb) {
	var usersTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

	usersTable.scan(function (err, item, response) {
    if(err){
      cb(err);
    }else{
      cb(null, item)
    }
	})
}


module.exports = Users;