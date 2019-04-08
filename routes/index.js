const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stamp' });
});

router.post('/', function(req, res, next) {
  let title = req.body.title;
  let createdAt = moment();
  console.log(createdAt);
})

module.exports = router;
