const mysql = require('mysql');
require('dotenv').config();

// local用

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'test',
  password: 'test',
  database: 'test'
};


// リリース用
/*
const dbConfig = {
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'b62372516e3d30',
  password: process.env.DB_CONFIG_PASSWORD,
  database: 'heroku_9d81f307dfe298a'
}
*/
let connection = mysql.createConnection(dbConfig);

// これはHerokuのMySQLのためのハックです。
/*
setInterval(function() {
  connection.query('SELECT 1');
}, 5000);
*/
module.exports = connection;