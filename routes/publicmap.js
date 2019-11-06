const express = require('express');
const router = express.Router();
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  let userId = req.session.user_id;

  if (req.session.user_id) {
    res.render('publicmap', {
      title: '公開地図一覧',
      newmap: '地図を作る',
      viewmap: '地図を見る',
      mypage: 'マイページ',
      logout: 'ログアウト',
    })
  } else {
    res.render('publicmap', {
      title: '地図一覧',
      register: '新規登録',
      login: 'ログイン',
    })
  }
})

module.exports = router