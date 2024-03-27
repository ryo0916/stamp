const mysql = require('mysql');
require('dotenv').config();

// Docker用

const dbConfig = {
  host: 'db',
  port: 3306,
  user: 'test',
  password: 'test',
  database: 'stamp'
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
const connection = mysql.createConnection(dbConfig);

// これはHerokuのMySQLのためのハックです。
/*
setInterval(function() {
  connection.query('SELECT 1');
}, 5000);
*/
module.exports = connection;