const express = require('express');
const router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');

router.get('/:map_id', function(req, res, next) {
  let mapId = req.params.map_id;
  let query = 'SELECT * FROM maps WHERE map_id =' + mapId;
  let getMarkerQuery = 'SELECT * FROM markers WHERE map_id =' + mapId;
  connection.query(query, function(err, map) {
    connection.query(getMarkerQuery, function(err, marker) {
      if (req.session.user_id) {
        res.render('editmap', {
          title: '地図作成',
          newmap: '地図を作る',
          viewmap: '地図を見る',
          mypage: 'マイページ',
          logout: 'ログアウト',

          map_id: map[0].map_id,
          map_name: map[0].map_name,
          center_latitude: map[0].latitude,
          center_longitude: map[0].longitude,
          marker_list: marker
        });
      } else {
        res.render('index', {
          title: '地図作成',
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
  let insertQuery = 'INSERT INTO markers (map_id, title, latitude, longitude, created_at, comment) VALUES ("' + map_id + '", ' + '"' + markerTitle + '", ' + '"' + latitude + '", ' + '"' + longitude + '", ' + '"' + createdAt + '", ' + '"' + comment + '")';
  connection.query(insertQuery, function(err, rows){
    res.redirect('/editmap/' + map_id);
  });
});

router.put('/', function(req, res, next) {
  let map_id = req.body.map_id;
  let currentLat = req.body.currentLat;
  let currentLng = req.body.currentLng;
  let markerTitle = req.body.markerTitle;
  let comment = req.body.comment;
  let updateQuery = 'UPDATE markers SET title = "' + markerTitle + '", comment = "' + comment + '" WHERE latitude = "' + currentLat + '" AND longitude = "' + currentLng + '"';
  connection.query(updateQuery, function(err, rows) {
    res.redirect('/editmap/' + map_id);
  });
});

router.delete('/', function(req, res, next) {
  let map_id = req.body.map_id;
  let deleteLat = req.body.deleteLat;
  let deleteLng = req.body.deleteLng;
  let deleteQuery = 'DELETE FROM markers WHERE latitude = "' + deleteLat + '" AND longitude = "' + deleteLng + '"';
  connection.query(deleteQuery, function(err, rows) {
    res.redirect('/editmap/' + map_id);
  });
});

module.exports = router;