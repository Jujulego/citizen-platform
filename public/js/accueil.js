$(document).ready(function() {
    // Connection echouée
    const connectionPopup = $("#connectionPopup");

    if (connectionPopup.hasClass("show")) {
        connectionPopup.modal('show');
    }

    connectionPopup.on("hide.bs.modal", function() {
        $(".erreur", connectionPopup).addClass("d-none");
    });

	// Gère la carte
    const map = L.map('osm-map', {
        center: [49.36000000, 0.07527780],
        zoom: 17
    });

	// Adresse où il va chercher la carte
    L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20
    }).addTo(map);

    function getlatlng(addr, titre, lienMission) {
        $.get({
            url: "https://nominatim.openstreetmap.org/search",
            data: {
                format: "json",
                limit: "3",
                q: addr
            },
            success(res) {
                if (res.length !== 0) {
                    const marker = L.marker([res[0].lat, res[0].lon]).addTo(map);
                    marker.bindPopup(`<a href='${lienMission}'>${titre}</a>`).openPopup();
                }
            }
        });
    }

    allMission.forEach(m => {
        getlatlng(m.lieu, m.titre, `/mission/${m.id}`, );
    });
});
