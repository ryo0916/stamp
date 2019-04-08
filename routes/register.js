const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  res.render('register', {
    title: '新規会員登録'
  });
});

router.post('/', function(req, res, next) {
  let userName = req.body.user_name;
  let email = req.body.email
  let password = req.body.password;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let checkEmailQuery = 'SELECT * FROM users WHERE email = "'+ email + '" LIMIT 1';
  let registerQuery = 'INSERT INTO users (name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")';
  connection.query(checkEmailQuery, function(err, email) {
    let emailExists = email.length;
    if (emailExists) {
      console.log('okやで');
      res.render('register', {
        title: '新規登録',
        emailExists: 'メールアドレスは既に登録されています'
      });
    } else {
      console.log('error');
      connection.query(registerQuery, function(err, rows) {
        res.redirect('../');
      });
    }
  });
});




module.exports = router;