const express = require('express');
const router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('register', {
      title: '新規登録',
      login: 'ログイン',
      register: '新規登録',
    });
  }
});

router.post('/', function(req, res, next) {
  let userName = req.body.user_name;
  let email = req.body.email;
  let email_register = email; // registerQuery代入用
  let password = req.body.password;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let checkEmailQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1'; // ?でSQLインジェクション対策
  let registerQuery = 'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)'; // ?でSQLインジェクション対策
  connection.query(checkEmailQuery, [email], function(err, email) { // ?に第二引数を代入
    // メルアド重複
    let emailExists;
    if (email) {
      emailExists = email.length;
    };
    console.log(email);
    if (emailExists) {
      console.log("メール重複");
      res.render('register', {
        title: '新規登録',
        login: 'ログイン',
        register: '新規登録',
        emailExists: 'メールアドレスは既に登録されています'
      });
    } else {
      // 登録成功
      connection.query(registerQuery, [userName, email_register, password, createdAt], function(err, rows) { // ?に第二引数を代入
        res.redirect('/login');
        console.log(err);
      });
    }
  });
});




module.exports = router;