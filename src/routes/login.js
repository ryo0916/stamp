const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let connection = require('../mysqlConnection');


router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン',
      register: '新規登録',
      login: 'ログイン',
    });
  }
});

router.post('/', function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let getPasswordQuery = 'SELECT * FROM users WHERE email=? LIMIT 1'; // ?でSQLインジェクション対策, 一意のメールアドレスを検索
  connection.query(getPasswordQuery, [email], function(err, rows) {
    if (rows[0]){ 
      let enrolledPassword = rows[0].password; // 登録済みのハッシュ済みパスワードをテーブルから取得
      let salt = enrolledPassword.slice(0, 29); // salt部分のみ切り取り
      let hashedPassword = bcrypt.hashSync(password, salt); // プレーンパスワードと登録済みハッシュ化パスワードのsalt部分でハッシュ化する
      if (enrolledPassword === hashedPassword) { // 今回ハッシュ化したものと以前ハッシュ化したものが一致するか確認
        req.session.user_id = rows[0].user_id;
        res.redirect('/');
      } else {
        res.render('login', {
          title: 'ログイン',
          register: '新規登録',
          login: 'ログイン',
          wrongPassword: 'パスワードが異なります'
        })
      }
    } else {
      res.render('login', {
        title: 'ログイン',
        register: '新規登録',
        login: 'ログイン',
        noUser: 'ユーザーが見つかりません'
      });
    }
  });
});

module.exports = router;