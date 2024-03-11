const express = require('express');
const router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.render('newmap', {
      title: '地図作成',
      newmap: '地図を作る',
      viewmap: '地図を見る',
      mypage: 'マイページ',
      logout: 'ログアウト'
    });
  } else {
    res.render('index', {
      title: 'stamp',
      register: '新規登録',
      login: 'ログイン'
    })
  }

});

router.post('/', function(req, res, next) {
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let mapName = req.body.mapName;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let user_id = req.session.user_id;
  let query = 'INSERT INTO maps (map_name, latitude, longitude, created_at, user_id) VALUES (?, ?, ?, ?, ?)'; // ?でSQLインジェクション対策
  let getMapidQuery = 'SELECT * FROM maps WHERE created_at = ? LIMIT 1'; // ?でSQLインジェクション対策
  connection.query(query, [mapName, latitude, longitude, createdAt, user_id], function(err, rows){ // ?に第二引数を代入
    connection.query(getMapidQuery, [createdAt], function(err, rows){ // ?に第二引数を代入
      const map_id = rows[0].map_id;
      res.redirect('editmap/' + map_id);
    })
  });
});

module.exports = router;