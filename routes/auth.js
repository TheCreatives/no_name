var express = require('express');
var mysql = require("mysql");
var router = express.Router();
var passport = require("passport");
require('../config/passport')(passport);

router.post('/login',
    function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                res.status(500).send(err);
            } else if (!user) {
                res.status(401).send(info);
            } else {
                req.logIn(user, function(e) {
                    if (e) res.status(500).send(e);
                    else res.send(user);
                });
            }
        })(req, res, next);
    }
);

router.get('/logout', function(req, res, next) {
    req.logout();
    res.send({
        msg: "USER_LOGOUT"
    });
});

module.exports = router;