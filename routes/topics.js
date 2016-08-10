var express = require('express');
var router = express.Router();
var connection = require("../config/executeQuery");
router.get('/:companyName', function(req, res, next) {
    connection.query({
        sql: "SELECT tbl_topics.id,tbl_topics.topic_name,tbl_topics.topic_description FROM tbl_topics INNER JOIN tbl_users where tbl_users.id=tbl_topics.companyid AND tbl_users.user_id=?",
        values: [req.params.companyName]
    }, function(err, rows) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;