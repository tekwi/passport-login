var express = require('express')
  , router = express.Router()
  , Comment = require('../models/users')

router.get('/', function(req, res) {
    res.render('faq/')
})

module.exports = router