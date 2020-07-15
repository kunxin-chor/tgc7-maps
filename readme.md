# Leaflet Overlays

## Marker

```
let singaporeMarker = L.marker([1.29, 103.85]);
singaporeMarker.addTo(map);
```

## Circle
```
let circle = L.circle([1.35166526, 103.773663572], {
    color: 'red',
    fillColor:"orange",
    fillOpacity:0.5,
    radius: 500
})
```

# Marker Clusters

Get the files from: https://unpkg.com/leaflet.markercluster@1.4.1/dist/

Include the following files
```
   <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css">
   <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css">
```

```
    <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js"></script>
 ```

