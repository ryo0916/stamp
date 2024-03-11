const express = require('express');
const router = express.Router();
const axios = require('axios');
let moment = require('moment');
let connection = require('../mysqlConnection');
require('dotenv').config();

router.get('/', function(req, res, next) {
  if(req.session.user_id) {
    res.render('find', {
      title: 'お店検索',
      newmap: '地図を作る',
      viewmap: '地図を見る',
      mypage: 'マイページ',
      logout: 'ログアウト',
    });
  } else {
    res.render('find', {
      title: 'お店検索',
      register: '新規登録',
      login: 'ログイン',
    })
  }

});

// フォームの内容と一緒にポスト

router.get('/gnavi', function(req, res, next) {
  let freeword = req.query.freeword;
  const keyid = process.env.GRUNAVI_KEY;
  const hitnum = '30';
  let url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${keyid}&hit_per_page=${hitnum}&freeword=`;
  url += encodeURIComponent(freeword);

  let userId = req.session.user_id;
  let getMapQuery = 'SELECT * FROM maps WHERE user_id = ?';
  connection.query(getMapQuery, [userId], function(err, map) {
    map = map;
    axios.get(url, map)
    .then((response)=> {
      let restsArray = [];
      let objectArray;
      let array = [];
      restsArray = response.data.rest;
      map = map
      for (let key in restsArray) {
        objectArray = '';
        let title = restsArray[key].name;
        let latitude = restsArray[key].latitude;
        let longitude = restsArray[key].longitude;
        let url = restsArray[key].url;
        let image_url = restsArray[key].image_url.shop_image1;
        let area = restsArray[key].code.areaname_s;
        let category = restsArray[key].category;
        objectArray = {title, latitude, longitude, url, image_url, area, category};
        array.push(objectArray);
      }
      if (req.session.user_id) {
          res.render('find', {
            rests: array,
            title: 'お店検索',
            newmap: '地図を作る',
            viewmap: '地図を見る',
            mypage: 'マイページ',
            logout: 'ログアウト',
            maps: map
          });
      } else {
        res.render('find', {
          rests: array,
          title: 'お店検索',
          register: '新規登録',
          login: 'ログイン'
        });
      }
    })

    .catch((err)=> {
      const errorWord = 'エラーが発生しました。別の単語で探してください。';
      console.log('errだよ');
      if (req.session.user_id) {
        res.render('find', {
          error: errorWord,
          title: 'お店検索',
          newmap: '地図を作る',
          viewmap: '地図を見る',
          mypage: 'マイページ',
          logout: 'ログアウト'
        });
      } else {
        res.render('find', {
          error: errorWord,
          title: 'お店検索',
          register: '新規登録',
          login: 'ログイン'
        })
      }
    })
  })
})

// rest-itemにフォームを追加し、地図を選択してマーカーを追加する機能を作成する
router.post('/', function(req, res, next) {
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let markerTitle = req.body.markerTitle;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let map_id = req.body.map_id;
  let comment = "";
  let insertQuery = 'INSERT INTO markers (map_id, title, latitude, longitude, created_at, comment) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(insertQuery, [map_id, markerTitle, latitude, longitude, createdAt, comment], function(err, rows){
    res.redirect('/editmap/' + map_id); // 仮で地図ページへ
  });
})

module.exports = router;