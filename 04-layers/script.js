function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}


let singapore = [ 1.29,103.85]; // Singapore latlng
let map = L.map('map').setView(singapore, 13);

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

let group= L.layerGroup();
L.marker(getRandomLatLng(map)).addTo(group);
L.marker(getRandomLatLng(map)).addTo(group);
L.marker(getRandomLatLng(map)).addTo(group);

// add the group layer to the map
group.addTo(map);

let group2 = L.layerGroup();
for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map), {
    color: 'red',
    fillColor:"orange",
    fillOpacity:0.5,
    radius: 500
}).addTo(group2);
}

let group3 = L.layerGroup();
for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map), {
    color: 'red',
    fillColor:"green",
    fillOpacity:0.5,
    radius: 250
}).addTo(group3);
}

// group2.addTo(map)

let baseLayers ={
    'Markers': group,
    'Circles': group2
}

let overlays = {
    'Green Circle':group3
}

L.control.layers(baseLayers, overlays).addTo(map);

document.querySelector('#toggle-green').addEventListener('click', function(){
    if (map.hasLayer(group3)) {
        map.removeLayer(group3)
    } else {
        map.addLayer(group3);
    }
})
