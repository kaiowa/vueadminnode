var mysql = require('mysql');
const config =require('./config');
var db = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: config.databasename
});

module.exports=db;