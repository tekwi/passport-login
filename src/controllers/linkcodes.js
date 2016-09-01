var express = require('express')
  , router = express.Router()
  , Linkcodes = require('../models/linkcodes')

// Handle get req to /users  
router.get('/:id?', function(req, res) {
   Linkcodes.getAll(function (err, user) {
    res.send({user: user});
  })
});

module.exports = router;