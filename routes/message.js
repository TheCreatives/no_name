var express = require('express');
var connection = require("../config/executeQuery");
var router = express.Router();

router.get('/:companyId/:topicId/:messageId', function (req, res, next) {
    if (!req.params.companyId || !req.params.topicId || req.params.messageId) {
        res.send({ msg: "MISSING_REQUIRED_FIELDS" });
    } else {
        connection.query({
            sql: "SELECT tbl_messages.id,tbl_messages.topic_id,tbl_topics.companyid,tbl_messages.shortmessage,tbl_messages.referenceurl FROM tbl_messages INNER JOIN tbl_topics WHERE tbl_messages.topic_id=tbl_topics.id AND tbl_messages.is_public=1 AND tbl_messages.id=? AND tbl_messages.topic_id=? AND tbl_topics.companyid=?",
            values: [req.params.messageId, req.params.topicId, req.params.companyId]
        }, function (e, rows) {
            if (e) {
                res.send(e);
            } else {
                res.send(rows);
            }
        });
    }
});
function sendMessages(tokens, message, topic) {

}
module.exports = router;