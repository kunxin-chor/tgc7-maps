function populateTaxiMarkers() {
  axios
    .get("https://api.data.gov.sg/v1/transport/taxi-availability")
    .then(function(response) {
      markerClusterLayer.clearLayers();
      let taxiPositions = response.data.features[0].geometry.coordinates;

      for (let pos of taxiPositions) {
        // swap lng and lat
        let newPos = [pos[1], pos[0]];

        L.marker(newPos).addTo(markerClusterLayer);
      }

      markerClusterLayer.addTo(map);
    });
}

let singapore = [1.29, 103.85]; // Singapore latlng
let map = L.map("map").setView(singapore, 13);

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

// create marker cluster
let markerClusterLayer = L.markerClusterGroup();

document.querySelector("#refresh-btn").addEventListener('click', function(){
    populateTaxiMarkers();

})

setInterval(populateTaxiMarkers, 60000);

// to populate the initial markers
populateTaxiMarkers();