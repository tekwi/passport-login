var express = require('express')
  , router = express.Router()
  , Authcodes = require('../models/authcodes')

// Handle get req to /users  
router.get('/authcode/:id?', function(req, res) {
   Authcodes.get({id : req.query.id },function (err, items) {
     res.send(items);
  })
});

module.exports = router;