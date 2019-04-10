const express = require('express');
const router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');

router.get('/:map_id', function(req, res, next) {
  let mapId = req.params.map_id;
  let query = 'SELECT * FROM maps WHERE map_id =' + mapId;
  let getMarkerQuery = 'SELECT * FROM markers WHERE map_id =' + mapId;
  connection.query(query, function(err, map) {
    console.log(query);
    connection.query(getMarkerQuery, function(err, marker) {
      console.log(getMarkerQuery);
      console.log(marker);
      res.render('editmap', {
        map_id: map[0].map_id,
        map_name: map[0].map_name,
        center_latitude: map[0].latitude,
        center_longitude: map[0].longitude,
        marker_list: marker
      });
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
  let query = 'INSERT INTO markers (map_id, title, latitude, longitude, created_at, comment) VALUES ("' + map_id + '", ' + '"' + markerTitle + '", ' + '"' + latitude + '", ' + '"' + longitude + '", ' + '"' + createdAt + '", ' + '"' + comment + '")';
  connection.query(query, function(err, rows){
    console.log(query);
    res.redirect('/editmap/' + map_id);
  });
});
module.exports = router;