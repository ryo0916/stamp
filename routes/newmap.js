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
  let query = 'INSERT INTO maps (map_name, latitude, longitude, created_at, user_id) VALUES ("' + mapName + '", ' + '"' + latitude + '", ' + '"' + longitude + '", ' + '"' + createdAt + '", ' + '"' + user_id + '")';
  let getMapidQuery = 'SELECT * FROM maps WHERE created_at = "' + createdAt + '" LIMIT 1';
  connection.query(query, function(err, rows){
    connection.query(getMapidQuery, function(err, rows){
      const map_id = rows[0].map_id;
      res.redirect('editmap/' + map_id);
    })
  });
});

module.exports = router;