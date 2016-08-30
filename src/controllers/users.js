var express = require('express')
  , router = express.Router()
  , Comment = require('../models/user')

router.get('/:id', function(req, res) {
  Comment.get(req.params.id, function (err, user) {
    res.render('users/user', {user: user})
  })
})

module.exports = router