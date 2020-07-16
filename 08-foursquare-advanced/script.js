// Set the client ID and the client Secret
const CLIENT_ID = "ZZRZPXEMHUUMYVDT3G1DAOBOPZ45LBU34PNNSGZLKV2AT1VC";
const CLIENT_SECRET = "KO5PSTDL532UKMCGVAWD1KQ1WCRMJQ0VAX4YIZXAV55BYKC5";

// global state
let hotelsLoaded = 0;
let searchOrigin = [1.29, 103.85];

$(function() {
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

  //loadHotels(singapore, map, 0);'

  let searchResultsLayer = L.layerGroup();
  let originLayer = L.layerGroup();
  map.addLayer(searchResultsLayer);
  map.addLayer(originLayer);

  map.on('click', function(e){
      originLayer.clearLayers();
      let position = [ e.latlng.lat, e.latlng.lng ];
      searchOrigin = position;
      let circle = L.circle(searchOrigin, {
        fill: true,
        fillColor: "blue",
        radius: 100
      });
      circle.addTo(originLayer);
  })

  $("#get-next-btn").click(function() {
    loadHotels(singapore, map, hotelsLoaded);
  });

  $("#search").click(function() {
    searchResultsLayer.clearLayers();
    let searchTerms = $("#search-terms").val();
    let options = {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: "20200716",
        ll: searchOrigin.join(", "), // becomes "1.29, 103.85"
        query: searchTerms,
        offset: 0,
        limit: 50
      }
    };

    axios
      .get("https://api.foursquare.com/v2/venues/explore", options)
      .then(function(response) {
        let searchResults = response.data.response.groups[0].items;
        for (let r of searchResults) {
          let location = r.venue.location;
          let marker = L.marker([location.lat, location.lng]);
          marker.bindPopup(`<p>${r.venue.name}</p>`);
          marker.addTo(searchResultsLayer);
        }
      });
  });
});

// origin must be an array that contains the lat lng to base the search on
function loadHotels(origin, map, offset) {
  // add in options so that we can specify the parameters
  let options = {
    params: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      v: "20200716",
      ll: origin.join(", "), // becomes "1.29, 103.85"
      query: "hotels",
      offset: offset,
      limit: 50
    }
  };

  axios
    .get("https://api.foursquare.com/v2/venues/explore", options)
    .then(function(response) {
      let hotels = response.data.response.groups[0].items;
      hotelsLoaded += hotels.length;
      for (let h of hotels) {
        let location = h.venue.location;
        let marker = L.marker([location.lat, location.lng]);
        marker.bindPopup(`<p>${h.venue.name}</p>`);
        marker.addTo(map);
      }
      if (hotelsLoaded >= response.data.response.totalResults) {
        $("#get-next-btn").attr("disabled", true);
      }
    });
}
