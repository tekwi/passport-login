//dynamodb model
var DynamoDBModel = require('dynamodb-model');
//aws connection
var awsConfig   = require('../lib/awsconfig');

var tableSchema = new DynamoDBModel.Schema({
  id: {
    type: Number
  },
  serial : String,
  timestamp: Number, 
});

// create a model using the name of the DynamoDB table and a schema 
/**
 * linkcodesTable Db Model instance
 * @type {DynamoDBModel}
 * options are: table name, table schema and awsConfig
 */
var linkcodesTable = new DynamoDBModel.Model('linkcodes', tableSchema, awsConfig);

var Linkcodes = {}; 

// Create new row
Linkcodes.create = function(input, cb) {
  linkcodesTable.putItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get a particular row
Linkcodes.get = function(input, cb) {
  linkcodesTable.getItem(input, function (err, item, response) {
    if(err){
      cb(err);
    }else
      cb(null, item);
  })
}

// Get all rows
Linkcodes.getAll = function(cb) {
  // cb(null, "LINKCODES MODEL")
  // 
/*  var tableSchema = new DynamoDBModel.Schema({
    id: {
      type: Number
    },
    serial : String,
    timestamp: Number, 
  });*/
  var linkcodesTable = new DynamoDBModel.Model('linkcodes', tableSchema, awsConfig);

  linkcodesTable.scan(function (err, item, response) {
    if(err){
      cb(err);
    }else{
      cb(null, item)
    }
  })
}

module.exports = Linkcodes;