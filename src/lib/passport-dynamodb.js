// load all the things we need
var LocalStrategy   = require('passport-local').Strategy
    , uuid = require('node-uuid')
    , bcrypt = require('bcrypt-nodejs')
    , Users = require('../models/users')
    , Serialwhitelist = require('../models/serial_whitelist')
    , acl  = require('../lib/acl');

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  //serialize login session
  passport.serializeUser(function (user, done) {
    done(null, user.email);
  });
  //deserialize login session
  passport.deserializeUser(function (user,done) {
    Users.get({"email" : user}, function(err,items){
      if (err)
        done(err,items);
      else if(items)
        done(null,items);
      else
        done(err, false);
    })
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
   function(req, email, password, done) {
    //check if the email is unique
    Users.get({"email" : email}, function(err, items) {
      if(items) {
        return done(err,false, req.flash('message', "Email already registered."));
      }else{
        //check if the serial is whitelisted
        Serialwhitelist.get({"id" : req.body.serial }, function(err, items) {
          if(!items) {
            return done(err,false, req.flash('message', "Invalid Serial number."));
          }else{
             //User data
              var user_data = {
                                "id": (Math.floor(Math.random() * 4294967296)).toString(),
                                "firstName": req.body.firstName,
                                "lastName": req.body.lastName ,
                                "email": req.body.email,
                                "pw": bcrypt.hashSync(password),
                                "serial": req.body.serial 
                              };
              //add the user to the users table
              Users.create(user_data, function(err, items) {
                if (err) {
                  return done(null, false, req.flash('message', "Process error, please try again. (" + err + ")"));
                } else {
                  return done(null, user_data);
                }
              });       
          }
        })
      }
    });
    
   }
  ));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form
    //input
   var input = [];
       input["query"] = {"email" : email};
       input["pw"] = password ;
    //get username and password
    Users.get(input["query"],function(err,items){
        if(!items){
          return done(null, false, req.flash('message', 'Invalid Username or Password'));
        }else if(!bcrypt.compareSync(input["pw"], items.pw)) {
          return done(null, false, req.flash('message', 'Incorrect Password'));
        }else{
          return done(null, items);
        }
    });
  }));
};
