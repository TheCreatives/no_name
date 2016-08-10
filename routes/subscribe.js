var express = require('express');
var connection = require("../config/executeQuery");
var router = express.Router();

router.get('/:topicId', function (req, res, next) {
    if (!req.params.topicId) {
        res.send({ msg: "MISSING_REQUIRED_FIELDS" });
    } else {
        connection.query({
            sql: "INSERT INTO tbl_subscriptions (usr_id,topic_id) VALUES (?,?)",
            values: [req.user.id, req.params.topicId]
        }, function (e, rows) {
            if (e) {
                res.send(e);
            } else {
                res.send(rows);
            }
        });
    }
});

module.exports = router;