// Set the client ID and the client Secret
const CLIENT_ID="ZZRZPXEMHUUMYVDT3G1DAOBOPZ45LBU34PNNSGZLKV2AT1VC";
const CLIENT_SECRET="KO5PSTDL532UKMCGVAWD1KQ1WCRMJQ0VAX4YIZXAV55BYKC5";

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

axios.get('https://api.foursquare.com/v2/venues/explore', {
    params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: '20200716',
        ll: singapore.join(", "), // becomes "1.29, 103.85"
        query: 'hotels'
    }
}).then(function(response){
    let hotels = response.data.response.groups[0].items;
    for (let h of hotels) {
        let location = h.venue.location;
        let marker = L.marker([location.lat, location.lng ]);
        marker.bindPopup(`<p>${h.venue.name}</p>`);
        marker.addTo(map);
    }
})
