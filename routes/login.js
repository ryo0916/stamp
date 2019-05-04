const express = require('express');
const router = express.Router();
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
  let query = 'SELECT user_id FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
  connection.query(query, function(err, rows) {
    if (rows[0]) {
      req.session.user_id = rows[0].user_id;
      res.redirect('/');
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