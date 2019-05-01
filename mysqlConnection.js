const mysql = require('mysql');

// local用
/*
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'stamp'
};
*/

// リリース用
const dbConfig = {
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'b62372516e3d30',
  password: 'c83c432b',
  database: 'heroku_9d81f307dfe298a'
}

let connection = mysql.createConnection(dbConfig);

// これはHerokuのMySQLのためのハックです。
setInterval(function() {
  connection.query('SELECT 1');
}, 5000);

module.exports = connection;