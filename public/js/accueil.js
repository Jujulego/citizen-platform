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
        center: [49.36000000, 0.07527780],
        zoom: 17
    });

	// Adresse où il va chercher la carte
    L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20
    }).addTo(map);

    function getlatlng(addr, titre) {
        $.get({
            url: "https://nominatim.openstreetmap.org/search",
            data: {
                format: "json",
                limit: "3",
                q: addr
            },
            success(res) {
                if(res.length != 0){
                    var marker = L.marker([res[0].lat, res[0].lon]).addTo(map);
                    marker.bindPopup("<b>"+titre+"</b>").openPopup();
                }
            }
        });
    }


    //getlatlng(missions[0].lieu, missions[0].titre);

    console.log(missions.length);
    for(let i = 0; i<missions.length; i++) {
        console.log(i);
        getlatlng(missions[i].lieu, missions[i].titre);
    }

});
