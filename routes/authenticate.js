var express = require('express');
var session = require("express-session");

var router = express.Router();

router.use(function(req, res, next) {
    if (req.isAuthenticated() && req.session.passport) next();
    else res.status(401).send({ msg: "UNAUTHORIZED", code: 401 });
});

module.exports = router;