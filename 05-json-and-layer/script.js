

$(function() {
  let map = createMap([1.29, 103.85], 13);
  let baseLayers = [];

  let loadLayers = [
    addLayer("data/hdb.json", map, "blue", baseLayers, "HDB"),
    addLayer("data/nature.json", map, "green", baseLayers, "Nature"),
    addLayer("data/shopping.json", map, "red", baseLayers, "Shopping")
  ];

  axios.all(loadLayers).then(function() {
    L.control.layers(baseLayers).addTo(map);
  });
});
