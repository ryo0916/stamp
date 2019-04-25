const express = require('express');
const router = express.Router();
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  let userId = req.session.user_id;
  let viewMapQuery = 'SELECT * FROM maps WHERE user_id =' + userId;

  connection.query(viewMapQuery, function(err, map) {
    if (req.session.user_id) {
      res.render('viewmap', {
        title: '地図作成',
        newmap: '地図を作る',
        viewmap: '地図を見る',
        mypage: 'マイページ',
        logout: 'ログアウト',
        message: '地図一覧',

        mapList: map,
      });
    } else {
      res.render('viewmap', {
        title: '地図作成',
        register: '新規登録',
        login: 'ログイン',
        message: 'ログインしてください'
      });

    };
    console.log(map);
  })

});

module.exports = router;