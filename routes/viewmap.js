const express = require('express');
const router = express.Router();
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  let userId = req.session.user_id;
  let viewMapQuery = 'SELECT * FROM maps WHERE user_id = ?'; // ?でSQLインジェクション対策

  connection.query(viewMapQuery, [userId], function(err, map) { // 第二引数を?に代入
    if (req.session.user_id) {
      res.render('viewmap', {
        title: '地図一覧',
        newmap: '地図を作る',
        viewmap: '地図を見る',
        mypage: 'マイページ',
        logout: 'ログアウト',
        mapList: map,
      });
    } else {
      res.render('viewmap', {
        title: '地図一覧',
        register: '新規登録',
        login: 'ログイン',
        message: 'ログインしてください'
      });

    };
  })

});

module.exports = router;