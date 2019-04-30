const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  let getMyInfoQuery = 'SELECT * FROM users WHERE user_id =' + req.session.user_id;
  connection.query(getMyInfoQuery, function(err, info) {
    if(req.session.user_id) {
      res.render('mypage', {
        title: 'マイページ(β)',
        name: info[0].name,
        email: info[0].email,
        newmap: '地図を作る',
        viewmap: '地図を見る',
        mypage: 'マイページ',
        logout: 'ログアウト',
        message: '地図一覧',
      });
    } else {
      res.render('index', {
        title: 'レストラン検索',
        register: '新規登録',
        login: 'ログイン',
      })
    }
  })
});

module.exports = router;