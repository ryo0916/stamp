const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/', function(req, res, next) {
  if(req.session.user_id) {
    res.render('find', {
      title: 'レストラン検索',
      newmap: '地図を作る',
      viewmap: '地図を見る',
      mypage: 'マイページ',
      logout: 'ログアウト',
      message: '地図一覧',
    });
  } else {
    res.render('find', {
      title: 'レストラン検索',
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

  axios.get(url)
  .then((response)=> {
    let restsArray = [];
    let nameArray;
    let array = [];
    restsArray = response.data.rest;

    for (let key in restsArray) {
      nameArray = '';
      let title = restsArray[key].name;
      let latitude = restsArray[key].latitude;
      let longitude = restsArray[key].longitude;
      let url = restsArray[key].url;
      let area = restsArray[key].code.areaname_s;
      let category = restsArray[key].category;
      nameArray = {title, latitude, longitude, url, area, category};
      array.push(nameArray);
    }
    console.log(array);
    res.render('find', {
      rests: array
    });

  })
  .catch((err)=> {
    const errorWord = 'エラーが発生しました。別の単語で探してください。';
    console.log('errだよ');
    res.render('find', {
      error: errorWord
    });
  })

})

module.exports = router;