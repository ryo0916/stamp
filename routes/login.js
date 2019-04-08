const express = require('express');
const router = express.Router();
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン'
    });
  }
});

router.post('/', function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let query = 'SELECT user_id FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
  connection.query(query, function(err, rows) {
    let userId = rows.length? rows[0].user_id: false;
    if (userId) {
      req.session.user_id = userId;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});

module.exports = router;