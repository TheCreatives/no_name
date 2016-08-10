var mysql = require("mysql");
var dbConfig = require("./dbConfig");
var connection = mysql.createConnection(dbConfig);

module.exports=connection;