main();

async function main() {
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

//   let response = await axios.get("data/cycle.geojson");
//   let cyclingLayer = L.geoJson(response.data).addTo(map);

//   let nptracksResponse = await axios.get('data/nparks.geojson');
//   let nptrackLayer = L.geoJson(nptracksResponse.data).addTo(map);

  // fires off the request to fetch the various json files
  let cycleRequest =  axios.get("data/cycle.geojson");
  let parkRequest = axios.get('data/parks.geojson');

  // wait for the geojson to finish
  let response = await cycleRequest;
  let parkResponse = await parkRequest; 

  // add them as layers
  let cyclingLayer = L.geoJson(response.data, {
      onEachFeature: function(feature, layer) {
          // if we are using geojson, it will always be feature.properties.Description
          layer.bindPopup(feature.properties.Description);
      }
  }).addTo(map);
  let nptrackLayer = L.geoJson(parkResponse.data,{
      onEachFeature: function(feature, layer) {

            let html = $(feature.properties.Description);
            let name = html.find('td')[0].innerText;

            // layer.bindPopup(feature.properties.Description);
            layer.bindPopup(`<p>${name}</p>`)
      }
  }).addTo(map);

  cyclingLayer.setStyle({
      'color':'red'
  })

  nptrackLayer.setStyle({
      'color':'green'
  })

}
