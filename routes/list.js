var express = require('express');
var connection = require("../config/executeQuery");
var router = express.Router();

router.get('/category/:categoryId', function (req, res, next) {
    if (req.params.categoryId) {
        var _start = parseInt(req.query.start || 0);
        var _topics = parseInt(req.query.topics || 10);
        var _query = (req.query.query || '') + '%';
        connection.query({
            sql: "SELECT tbl_topics.id,tbl_topics.companyid,tbl_topics.topic_category,tbl_topics.topic_name,tbl_topics.topic_description,tbl_users.company_name,tbl_users.company_description,tbl_categories.category_text FROM tbl_topics INNER JOIN tbl_users,tbl_categories where tbl_topics.companyid=tbl_users.id AND tbl_categories.id=tbl_topics.topic_category AND (tbl_topics.topic_name LIKE ?) AND tbl_topics.topic_category=? ORDER BY tbl_topics.id DESC  LIMIT ?,?",
            values: [_query, req.params.categoryId, _start, _topics]
        }, function (err, rows) {
            if (err) {
                res.send(err);
            } else {
                res.send(rows);
            }
        });
    } else {
        res.send({ msg: "CATEGORY_NOT_DEFINED" });
    }
});

router.get('/', function (req, res, next) {
    var _start = parseInt(req.query.start || 0);
    var _topics = parseInt(req.query.topics || 10);
    var _query = (req.query.query || '') + '%';
    connection.query({
        sql: "SELECT tbl_topics.id,tbl_topics.companyid,tbl_topics.topic_category,tbl_topics.topic_name,tbl_topics.topic_description,tbl_users.company_name,tbl_users.company_description,tbl_categories.category_text FROM tbl_topics INNER JOIN tbl_users,tbl_categories where tbl_topics.companyid=tbl_users.id AND tbl_categories.id=tbl_topics.topic_category AND (tbl_topics.topic_name LIKE ?) ORDER BY tbl_topics.id DESC  LIMIT ?,?",
        values: [_query, _start, _topics]
    }, function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;