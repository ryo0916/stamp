// 初期化処理
function init() {
  let map = L.map('mapid').setView([35.691213, 139.701106],16);
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

  
  index_ramen(map);

}

// トップページのおすすめラーメンを追加
function index_ramen(map) {
  const ramen1 = L.popup().setContent("つけ麺 五ノ神製作所<br><a target=_blank rel=noopener noreferrer href=http://gonokamiseisakusho.com/>ホームページ<a>");
  const ramen2 = L.popup().setContent("SOBA HOUSE 金色不如帰<br><a target=_blank rel=noopener noreferrer href=https://twitter.com/ptwgqjbfwgjw>ツイッター<a>");
  const ramen3 = L.popup().setContent("えびそば 一幻<br><a target=_blank rel=noopener noreferrer href=http://www.ebisoba.com/>ホームページ<a>");
  const ramen4 = L.popup().setContent("麺屋海神<br><a target=_blank rel=noopener noreferrer href=https://tabelog.com/tokyo/A1320/A132001/13117094/>食べログ<a>")
  const ramen5 = L.popup().setContent("一蘭 新宿中央東口店<br><a target=_blank rel=noopener noreferrer href=https://ichiran.com/shop/tokyo/shinjuku/>ホームページ<a>")
  const ramen6 = L.popup().setContent("AFURI 新宿店<br><a target=_blank rel=noopener noreferrer href=http://afuri.com/findus/>ホームページ<a>")
  const ramen7 = L.popup().setContent("風雲児<br><a target=_blank rel=noopener noreferrer href=http://www.fu-unji.com/index.html>ホームページ<a>")
  const ramen8 = L.popup().setContent("万世麺店 新宿西口店<br><a target=_blank rel=noopener noreferrer href=https://www.niku-mansei.com/contents/02shiten/02tokyo_ra_sinjyuku.html>ホームページ<a>")
  const ramen9 = L.popup().setContent("らーめん山頭火 新宿南口店<br><a target=_blank rel=noopener noreferrer href=https://www.santouka.co.jp/shop-jp/kanto/area03-004>ホームページ<a>")
  const ramen10 = L.popup().setContent("メンショー サンフランシスコ<br><a target=_blank rel=noopener noreferrer href=http://menya-shono.com/menshosf/>ホームページ<a>")
  L.marker([35.687351,139.703862],{icon: L.divIcon({className: 'marker'})},{title:"つけ麺 五ノ神製作所"}).bindPopup(ramen1).addTo(map);
  L.marker([35.688749,139.708282],{icon: L.divIcon({className: 'marker'})},{title:"SOBA HOUSE 金色不如帰"}).bindPopup(ramen2).addTo(map);
  L.marker([35.695485,139.698058],{icon: L.divIcon({className: 'marker'})},{title:"えびそば 一幻"}).bindPopup(ramen3).addTo(map);
  L.marker([35.689751,139.702276],{icon: L.divIcon({className: 'marker'})},{title:"麺屋海神"}).bindPopup(ramen4).addTo(map);
  L.marker([35.690553,139.70277], {icon: L.divIcon({className: 'marker'})},{title:"一蘭 新宿中央東口店"}).bindPopup(ramen5).addTo(map);
  L.marker([35.689211,139.699299],{icon: L.divIcon({className: 'marker'})},{title:"AFURI 新宿店"}).bindPopup(ramen6).addTo(map);
  L.marker([35.686845,139.696646],{icon: L.divIcon({className: 'marker'})},{title:"風雲児"}).bindPopup(ramen7).addTo(map);
  L.marker([35.691321,139.699615],{icon: L.divIcon({className: 'marker'})},{title:"万世麺店 新宿西口店"}).bindPopup(ramen8).addTo(map);
  L.marker([35.688733,139.698456],{icon: L.divIcon({className: 'marker'})},{title:"らーめん山頭火 新宿南口店"}).bindPopup(ramen9).addTo(map);
  L.marker([35.689455,139.699777],{icon: L.divIcon({className: 'marker'})},{title:"メンショー サンフランシスコ"}).bindPopup(ramen10).addTo(map);
}

init();



