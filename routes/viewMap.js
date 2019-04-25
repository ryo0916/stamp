const express = require('express');
const router = express.Router();
let connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  res.render('viewMap', {
    title: '地図閲覧'
  });
});

module.exports = router;