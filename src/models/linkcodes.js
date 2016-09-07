//dynamodb model
var DynamoDBModel = require('dynamodb-model');
//aws connection
var awsConfig   = require('../lib/awsconfig');

var tableSchema = new DynamoDBModel.Schema({
  id: Number,
  serial : String,
  timestamp: Number, 
});

var tableName = "linkcodes";

// create a model using the name of the DynamoDB table and a schema 
/**
 * linkcodesTable Db Model instance
 * @type {DynamoDBModel}
 * options are: table name, table schema and awsConfig
 */
//var linkcodesTable = new DynamoDBModel.Model('linkcodes', tableSchema, awsConfig);

var Linkcodes = {}; 

// Create new row
Linkcodes.create = function(input, cb) {
  var linkcodesTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

  linkcodesTable.putItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get a particular row
Linkcodes.get = function(input, cb) {
  var linkcodesTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

  linkcodesTable.getItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get all rows
Linkcodes.getAll = function(cb) {
  var linkcodesTable = new DynamoDBModel.Model(tableName, tableSchema, awsConfig);

  linkcodesTable.scan(function (err, item, response) {
    if(err){
      cb(err);
    }else{
      cb(null, item)
    }
  })
}

module.exports = Linkcodes;