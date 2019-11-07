const express = require('express');
const router = express.Router();
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  let userId = req.session.user_id;
  let publicMapQuery = 'SELECT * FROM maps WHERE public = ?';
  let publicOk = 1;

  connection.query(publicMapQuery, publicOk, function(err, map) {
    if (req.session.user_id) {
      res.render('publicmap', {
        title: '公開地図一覧',
        newmap: '地図を作る',
        viewmap: '地図を見る',
        mypage: 'マイページ',
        logout: 'ログアウト',
        mapList: map,
      })
    } else {
      res.render('publicmap', {
        title: '地図一覧',
        register: '新規登録',
        login: 'ログイン',
        mapList: map,
      })
    }
  })

});

router.get('/:map_id', function(req, res, next) {
  let mapId = req.params.map_id;
  let query = 'SELECT * FROM maps WHERE map_id = ?';
  let getMarkerQuery = 'SELECT * FROM markers WHERE map_id = ?';
  connection.query(query, [mapId], function(err, map) {
    if (map[0].public === 1) {
      connection.query(getMarkerQuery, [mapId], function(err, marker) {
        if (req.session.user_id) {
          res.render('publicmap', {
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

            message: map[0].map_name
          });
        } else {
          res.render('publicmap', {
            title: '地図ページ',
            register: '新規登録',
            login: 'ログイン',

            map_id: map[0].map_id,
            map_name: map[0].map_name,
            center_latitude: map[0].latitude,
            center_longitude: map[0].longitude,
            marker_list: marker,

            message: map[0].map_name
          });
        };
      });
    } else if (map[0].public === 0) {
      if (req.session.user_id) {
        res.render('publicmap', {
          title: '地図ページ',
          newmap: '地図を作る',
          viewmap: '地図を見る',
          mypage: 'マイページ',
          logout: 'ログアウト',

          message: 'この地図は公開されていません'
        });
      } else {
        res.render('publicmap', {
          title: '地図ページ',
          register: '新規登録',
          login: 'ログイン',

          message: 'この地図は公開されていません'
        });
      };
    }
  });
});

module.exports = router