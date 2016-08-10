var md5 = require("md5");
var LocalStrategy = require('passport-local').Strategy;
var connection = require("./executeQuery")

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        connection.query({
            sql: "select id,user_type from `tbl_users` where `id`=?",
            values: [id],
            timeout: 4000
        }, function (err, rows) {
            done(err, rows[0]);
        });
    });
    passport.use('local-login', new LocalStrategy({
        usernameField: 'userid',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, userid, password, done) {
            connection.query({
                sql: "SELECT `id`,`user_id`,`user_type`,`user_email` FROM `tbl_users` WHERE `user_id` = ? and `password_hash`=?",
                values: [userid, md5(password)],
                timeout: 4000
            }, function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, { msg: "INVALID_CREDENTIALS" });
                }
                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
}