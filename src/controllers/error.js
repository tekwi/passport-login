var express = require('express')
  , router = express.Router()
  , Comment = require('../models/users')

router.get('/', function(req, res) {
  Comment.get(req.params.id, function (err, user) {
    res.render('error/error', {user: user})
  })
})

module.exports = router