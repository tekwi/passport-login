var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
 	req.logout();
 	req.session.destroy(function() {
    res.clearCookie('connect.sid');
    res.redirect('/login');
});
 });

module.exports = router;