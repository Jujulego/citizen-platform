$(document).ready(function() {
    const map = L.map('osm-map', {
        center: [48.852072, 2.285928],
        zoom: 17
    });

    L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20
    }).addTo(map);
});