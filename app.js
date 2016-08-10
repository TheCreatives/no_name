var express = require('express');
var flash = require('req-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require("passport");
var MySQLStore = require('express-mysql-session');

var app = express();

var _auth = require("./routes/auth");
var _create = require("./routes/create");
var _list = require('./routes/list');
var _message = require('./routes/message');
var _subscribe = require('./routes/subscribe');
var _topics = require('./routes/topics');
var _user = require('./routes/user');
var _dbOptions = require("./config/dbConfig");
var _send = require("./routes/send");

var _authenticate = require("./routes/authenticate");

var sessionStore = new MySQLStore(_dbOptions);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    key: "pulsar_login",
    secret: "secret_code",
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));
app.use(flash({}));

app.use(passport.initialize());
app.use(passport.session());



if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

// Define Global headers
app.use(function (req, res, next) {
    res.set({
        "Access-Control-Allow-Origin": "*"
    });
    next();
});


// Endpoints
app.use("/auth", _auth);

// Verify Session.
app.use(_authenticate);
app.use("/create", _isCompany, _create);

app.use("/list", _list);
app.use("/message", _isUser, _message);
app.use("/subscribe", _isUser, _subscribe);
app.use("/topics", _isUser, _topics);
app.use("/user", _isUser, _user);
app.use("/send", _isUser, _send);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function _isCompany(req, res, next) {
    if (req.user.user_type == 1) {
        next();
    } else {
        res.send({ msg: "UNAUTHORIZED" });
    }
}

function _isUser(req, res, next) {
    if (req.user.user_type == 0) {
        next();
    } else {
        res.send({ msg: "UNAUTHORIZED" });
    }
}