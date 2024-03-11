const express = require('express');
const router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');

router.get('/:map_id', function(req, res, next) {
  let mapId = req.params.map_id;
  let query = 'SELECT * FROM maps WHERE map_id = ?';
  let getMarkerQuery = 'SELECT * FROM markers WHERE map_id = ?';
  connection.query(query, [mapId], function(err, map) {
    connection.query(getMarkerQuery, [mapId], function(err, marker) {
      if (req.session.user_id) {
        res.render('editmap', {
          title: '地図ページ',
          newmap: '地図を作る',
          viewmap: '地図を見る',
          mypage: 'マイページ',
          logout: 'ログアウト',

          map_id: map[0].map_id,
          map_name: map[0].map_name,
          center_latitude: map[0].latitude,
          center_longitude: map[0].longitude,
          marker_list: marker,
          public: map[0].public
        });
      } else {
        res.render('index', {
          title: '地図ページ',
          register: '新規登録',
          login: 'ログイン'
        });

      };


    });
  });
});

router.post('/', function(req, res, next) {
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let markerTitle = req.body.markerTitle;
  let comment = req.body.comment;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let map_id = req.body.map_id;
  let insertQuery = 'INSERT INTO markers (map_id, title, latitude, longitude, created_at, comment) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(insertQuery, [map_id, markerTitle, latitude, longitude, createdAt, comment], function(err, rows){
    res.redirect('/editmap/' + map_id);
  });
});

router.put('/', function(req, res, next) {
  let map_id = req.body.map_id;
  let currentLat = req.body.currentLat;
  let currentLng = req.body.currentLng;
  let markerTitle = req.body.markerTitle;
  let comment = req.body.comment;
  let updateQuery = 'UPDATE markers SET title = ?, comment = ? WHERE latitude = ? AND longitude = ?';
  connection.query(updateQuery, [markerTitle, comment, currentLat, currentLng], function(err, rows) {
    res.redirect('/editmap/' + map_id);
  });
});

router.delete('/', function(req, res, next) {
  let map_id = req.body.map_id;
  let deleteLat = req.body.deleteLat;
  let deleteLng = req.body.deleteLng;
  let deleteQuery = 'DELETE FROM markers WHERE latitude = ? AND longitude = ?';
  connection.query(deleteQuery, [deleteLat, deleteLng], function(err, rows) {
    res.redirect('/editmap/' + map_id);
  });
});

// 地図名を更新する
router.put('/newmapname/', function(req, res, next) {
  let map_id = req.body.currentMapId;
  let newmapname = req.body.newmapname;
  let newmapnameQuery = 'UPDATE maps SET map_name = ? WHERE map_id = ?';
  connection.query(newmapnameQuery, [newmapname, map_id], function(err, rows) {
    res.redirect('/editmap/' + map_id);
  });
});

// 外部公開の切り替え
router.put('/public/', function(req, res, next) {
  let map_id = req.body.map_id;
  let public = req.body.public;
  console.log(map_id, public)
  let changepublicQuery = 'UPDATE maps SET public = ? WHERE map_id = ?';

  connection.query(changepublicQuery, [public, map_id], function(err, rows) {
    res.redirect('/editmap/' + map_id);
  });
})


module.exports = router;