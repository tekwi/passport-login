var express = require('express')
  , router = express.Router()
  , passport = require('passport');

//All controllers are defined here
router.use('/users', require('./users'));
router.use('/login', require('./login')(passport));
router.use('/logout', require('./logout'));
router.use('/home', require('./home'));
router.use('/faq', require('./faq'));
router.use('/error', require('./error'));
router.use('/auth', require('./auth'));
router.use('/linkcodes', require('./linkcodes'));
router.use('/admin', require('./admin'));
router.use('/api', require('./api'));

router.use('/', require('./login')(passport));

router.get('/', function(req, res) {
  res.render('login/index', { message: req.flash('message') });
})

module.exports = router;