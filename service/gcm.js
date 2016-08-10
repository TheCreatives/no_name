var gcm = require('node-gcm');

var sender = new gcm.Sender('AIzaSyDvvYKJhwO3apHFFdgfmai_w8aTNRb3XyA');

module.exports = function () {
    this.sendMessage = function (message_ids, message, topic) {
        var message = new gcm.Message();
        message.addData(topic, message);
        sender.send(message, { registrationTokens: message_ids }, function (err, res) {
            if (err) return err;
            else return res;
        });
    }
}
