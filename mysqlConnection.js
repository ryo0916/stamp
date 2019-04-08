const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'stamp'
};

let connection = mysql.createConnection(dbConfig);

module.exports = connection;