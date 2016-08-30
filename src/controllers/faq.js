var express = require('express')
  , router = express.Router()
  , Comment = require('../models/user')

router.get('/', function(req, res) {
  Comment.get(req.params.id, function (err, user) {
    res.render('faq/faq', {user: user})
  })
})

module.exports = router