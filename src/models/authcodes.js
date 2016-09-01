//dynamodb model
var DynamoDBModel = require('dynamodb-model');
//aws connection
var awsConfig   = require('../lib/awsconfig');

var tableSchema2 = new DynamoDBModel.Schema({
  id: {
    type: String,
    key: 'hash'
  },
  code : String,
  timestamp: Number, 
  user: Number
});

// create a model using the name of the DynamoDB table and a schema 
/**
 * authcodesTable Db Model instance
 * @type {DynamoDBModel}
 * options are: table name, table schema and awsConfig
 */
var authcodesTable = new DynamoDBModel.Model('authcodes', tableSchema2, awsConfig);

var Authcodes = {}; 

// Create new row
Authcodes.create = function(input, cb) {
  authcodesTable.putItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get a particular row
Authcodes.get = function(input, cb) {
  authcodesTable.getItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get all rows
Authcodes.getAll = function(cb) {
  authcodesTable.scan(function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item)
  })
}

module.exports = Authcodes;