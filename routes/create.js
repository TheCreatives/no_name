var express = require('express');
var router = express.Router();
var connection = require("../config/executeQuery");

router.post('/', function(req, res, next) {
    if (!req.body.topic_name) {
        res.send({ msg: "NO_TOPIC_NAME" });
    } else {
        connection.query({
            sql: "select count(*) as count from tbl_topics where companyid=?",
            values: [req.user.id]
        }, function(err, rows) {
            if (err) {
                res.send(err)
            } else {
                if (rows[0].count >= 20) {
                    res.send({ msg: "ERROR_MAX_TOPIC_LIMIT" })
                } else {
                    connection.query({
                        sql: "INSERT INTO `tbl_topics`( `companyid`, `topic_name`,`topic_description`,'topic_category') VALUES (?,?,?,?)",
                        values: [req.user.id, req.body.topic_name, req.body.topic_desc,req.body.topic_category]
                    }, function(e, r) {
                        if (e) {
                            res.send(e);
                        } else {
                            res.send(r);
                        }
                    })
                }
            }
        });
    }
});

module.exports = router;