var express = require('express')
  , router = express.Router()
  , Users = require('../models/users')

// Handle get req to /users  
router.get('/:id?', function(req, res) {
   Users.getAll(function (err, user) {
    res.render('users/index',{users: user});
  })
});

module.exports = router;