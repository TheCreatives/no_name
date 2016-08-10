var express = require('express');
var connection = require("../config/executeQuery");
var gcm = require("../service/gcm");

var router = express.Router();
var sender = new gcm();

router.post('/', function (req, res) {
    if (!req.body.topic || !req.body.message) {
        res.send({ msg: "MISSING_REQUIRED_FIELDS" });
    } else {
        connection.query({
            sql: "",
            values: [req.body.topic]
        }, function (e, rows) {
            if (e) {
                res.send(e);
            } else {
                res.send(gcm.sendMessage(rows, message, topic));
            }
        })
    }
});
module.exports = router;