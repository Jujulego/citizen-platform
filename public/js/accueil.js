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

    function getlatlng(addr, titre, lienMission) {
        $.get({
            url: "https://nominatim.openstreetmap.org/search",
            data: {
                format: "json",
                limit: "3",
                q: addr
            },
            success(res) {
                if(res.length != 0){
                    var myIcon = L.icon({
                        iconUrl: 'icon_bleu.png'
                    });
                    var marker = L.marker([res[0].lat, res[0].lon]).addTo(map);
                    marker.bindPopup("<a href='"+lienMission+"'>"+titre+" </a>").openPopup();
                }
            }
        });
    }


    //getlatlng(missions[0].lieu, missions[0].titre);

    console.log(allMission.length);

    for(let i = 0; i<allMission.length; i++) {
        console.log(i);
        getlatlng(allMission[i].lieu, allMission[i].titre, "/mission/" + allMission[i].id, );
    }

});
