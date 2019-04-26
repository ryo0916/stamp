// 初期化処理
function init() {
  let map = L.map('mapid').setView([35.689020, 139.744860],14);
  let osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const osmAttribute = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(osmUrl,{
    attribution: osmAttribute,
    maxZoom: 19,
  }).addTo(map);
  
  // 拡大縮小のボタンの位置を右下に変更
  map.zoomControl.setPosition('bottomright');

  // スケールバーを付加
  L.control.scale({
    imperial: false,
    metric: true
  }).addTo(map);

}

init();