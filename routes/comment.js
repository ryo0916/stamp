const express = require('express');
const router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM comments';
  connection.query(query, function(err, rows) {
    res.render('comment', {
      title: 'テストページ',
      commentList: rows
     });
  });

});

router.post('/', function(req, res, next) {
  let comment = req.body.comment;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let query = 'INSERT INTO comments (comment, created_at) VALUES ("' + comment + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows) {
    console.log(query);
    res.redirect('/comment');
  });
});

module.exports = router;