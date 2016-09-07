//dynamodb model
var DynamoDBModel = require('dynamodb-model');
//aws connection
var awsConfig   = require('../lib/awsconfig');

var tableSchema = new DynamoDBModel.Schema({
  id:  String,
  code : String,
  timestamp: Number, 
  user: String
});

var tableName = "authcodes";

// create a model using the name of the DynamoDB table and a schema 
/**
 * authcodesTable Db Model instance
 * @type {DynamoDBModel}
 * options are: table name, table schema and awsConfig
 */

var Authcodes = {}; 

// Create new row
Authcodes.create = function(input, cb) {
  var authcodesTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

  authcodesTable.putItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get a particular row
Authcodes.get = function(input, cb) {
  var authcodesTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

  authcodesTable.getItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get all rows
Authcodes.getAll = function(cb) {
  var authcodesTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);
    
  authcodesTable.scan(function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item)
  })
}

module.exports = Authcodes;