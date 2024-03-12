const express = require('express');
const router = express.Router();
let moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.render('index', { 
      title: 'Stamp ログイン中',
      newmap: '地図を作る',
      viewmap: '地図を見る',
      mypage: 'マイページ',
      logout: 'ログアウト'
     });
  } else {
    res.render('index', {
      title: 'Stamp',
      register: '新規登録',
      login: 'ログイン'
    });
  }
  
});

router.post('/', function(req, res, next) {
  let title = req.body.title;
  let createdAt = moment();
  console.log(createdAt);
})

module.exports = router;
