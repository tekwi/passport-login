
// Dynamodb model


var express = require('express')
  , router = express.Router();

var DynamoDBModel = require('dynamodb-model');

var productSchema = new DynamoDBModel.Schema({
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


// Handle get req to /users  
router.get('/:id?', function(req, res) {


console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

// create a model using the name of the DynamoDB table and a schema 
var userTable = new DynamoDBModel.Model('user', productSchema, {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-2'
});


userTable.getItem({ id: "*" }, function (err, item, response) {
  // item represents the DynamoDB item mapped to an object using the schema 
  console.log(JSON.stringify(item)+ "working");
  res.send(item);

})

});


// the model provides methods for all DynamoDB operations 
// no need to check for table status, we can start using it right away 
// productTable.putItem(/* ... */);
// productTable.getItem(/* ... */);
// productTable.updateItem(/* ... */);
// productTable.deleteItem(/* ... */);
 
// // but some of them return intermediate objects in order to provide a better API 
// var query = productTable.query(/* ... */);
// query.select(/* ... */).limit(100).exec(callback);

module.exports = router; 