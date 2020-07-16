// Reads in the JSON data from the file specified by jsonFileName
// and create the markers inside it and add to a layer,
// and which will be added to the map object.
function addLayer(jsonFileName, map, color, baseLayers, layerName) {
  return axios.get(jsonFileName).then(function(response) {
    let layer = L.layerGroup();
    // create the layer group
    for (let poi of response.data) {
      let marker = L.marker(poi.coordinates);
      marker.bindPopup(`<p style='color:${color}'>${poi.name}</p>`);

      // add the marker to the layer
      marker.addTo(layer);
    }

    // like adding a new key to a Python dictionary
    baseLayers[layerName] = layer;
  });
}

function createMap(startLatLng, startZoomLevel) {
  let startPosition = startLatLng; // Singapore latlng
  let map = L.map("map").setView(startPosition, startZoomLevel);

  // setup the tile layers
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw" //demo access token
    }
  ).addTo(map);
  return map;
}