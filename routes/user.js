var express = require('express');
var connection = require("../config/executeQuery");
var router = express.Router();

router.post('/authorize', function (req, res) {
    connection.query({
        sql: "INSERT INTO tbl_message_tokens (user_id,message_token) VALUES (?,?) ON DUPLICATE KEY UPDATE message_token=?",
        values: [req.user.id, req.body.message_token, req.user.id]
    }, function (e, rows) {
        if (e) {
            res.send(e);
        } else {
            res.send({ code: 200, msg: "AUTH_SUCCESS" })
        }
    })
});

router.get('/subscriptions', function (req, res, next) {
    connection.query({
        sql: "SELECT tbl_topics.id,tbl_topics.companyid,tbl_users.company_name,tbl_users.company_description,tbl_topics.topic_name,tbl_topics.topic_description,tbl_categories.category_text FROM tbl_subscriptions INNER JOIN tbl_topics,tbl_users,tbl_categories WHERE tbl_subscriptions.topic_id=tbl_topics.id AND tbl_topics.companyid=tbl_users.id AND tbl_topics.topic_category=tbl_categories.id AND tbl_subscriptions.usr_id=?",
        values: [req.user.id]
    }, function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.get("/", function (req, res) {
    res.send("userinfo");
});

module.exports = router;