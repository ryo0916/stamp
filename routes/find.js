const express = require('express');
const router = express.Router();
const axios = require('axios');
let connection = require('../mysqlConnection');
let URL = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=47a62732f7d537f037481955d0cde58b&freeword=牛丼%20新宿'

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
  const keyid = 'null';
  let url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${keyid}&freeword=`;
  url += encodeURIComponent(freeword);

  axios.get(url)
  .then((res)=> {
    console.log(res.data.rest[1].name);
  })
  .catch((err)=> {
    console.log(err.response.data);
    console.log('errだよ');
  })
  res.render('find');
  console.log('終了');
})

/*
  axios.get(url)
  .then((res)=> {
    let restsArray = [];
    console.log(res.data.rest[1].name);
    res.data.rest.map((rests)=> {
      restsArray.push(rests);
    });
    // console.log(restsArray);

    if (restsArray !== undefined){
      res.render('find', {
        rests: restsArray
      });
    } else {
      res.render('find');
    }
    
  })
  .catch((err)=> {
    console.log(err.response);
    console.log('errだよ');
  })
*/

module.exports = router;