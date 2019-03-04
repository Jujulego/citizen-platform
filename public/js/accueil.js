function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
        }
    }
}

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
        center: [48.852072, 2.285928],
        zoom: 17
    });

	// Adresse où il va chercher la carte
    L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
        maxZoom: 20
    }).addTo(map);
});