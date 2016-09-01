
var _ = require("lodash");

var schemas = {
    user: {
        id: "123",
        name: "Sammy",
        password: null
    }
}
// var _ = require("lodash");

var User = function (data) {
    this.data = this.sanitize(data);
}

User.prototype.data = {};

User.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

User.prototype.getName = function (name) {
    return this.data.name;
}
User.prototype.getAll = function (name) {
    return this.data;
}

module.exports = User;



/*// Create new comment in your database and return its id
exports.create = function(user, text, cb) {
  cb('12345')
}

// Get a particular comment
exports.get = function(id, cb) {
  var data = {id: "123", name: "Sam Titus"}
  cb(null, data)
}

// Get all comments
exports.all = function(cb) {
  cb(null, [])
}

// Get all comments by a particular user
exports.allByUser = function(user, cb) {
  cb(null, [])
}*/




//

// var schemas = {
//     user: {
//         id: null,
//         name: null,
//         password: null
//     }
// }
// var _ = require("lodash");

// var User = function (data) {
//     this.data = this.sanitize(data);
// }

// User.prototype.data = {};

// User.prototype.sanitize = function (data) {
//     data = data || {};
//     schema = schemas.user;
//     return _.pick(_.defaults(data, schema), _.keys(schema)); 
// }

// User.prototype.get = function (name) {
//     return this.data[name];
// }

// module.exports = User;

// MODEL CLASS
/*
var db = require("./db.js");
// var schemas = require("./schemas.js");
var schemas = {
    user: {
        id: null,
        name: null,
        password: null
    }
}
var _ = require("lodash");

var User = function (data) {
    this.data = this.sanitize(data);
}

User.prototype.data = {}

User.prototype.changeName = function (name) {
    this.data.name = name;
}

User.prototype.get = function (name) {
    return this.data[name];
}

User.prototype.set = function (name, value) {
    this.data[name] = value;
}

User.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

User.prototype.save = function (callback) {
    var self = this;
    this.data = this.sanitize(this.data);
    db.get('users', {id: this.data.id}).update(JSON.stringify(this.data)).run(function (err, result) {
        if (err) return callback(err);
        callback(null, result); 
    });
}

User.findById = function (id, callback) {
    db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));
    });
}

module.exports = User;*/



//controller code - old users.js
/*var express = require('express')
  , router = express.Router()
  , User = require('../models/user')
  , Authcodes = require('../models/authcodes')
  , util = require('util');

// Handle get req to /users  
router.get('/:id?', function(req, res) {
   Authcodes.getByemail("sam@tekwi.com", function (err, user) {
    console.error(process.env);
    res.send({user: user});
  })
});

module.exports = router;*/