$(document).ready(function() {
	//gère la carte
    const map = L.map('osm-map', { 
        center: [48.852072, 2.285928],
        zoom: 17
    });

	//adresse où il va chercher la carte
    L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
        maxZoom: 20
    }).addTo(map);
});