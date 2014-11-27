var map = L.map('map');

L.tileLayer('http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr/{z}/{x}/{y}.png', {
            maxZoom: 18
            }).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    
    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

var atmIcon = L.icon({
                     iconName: "ATM_NODE_ICON",
                     iconUrl: "/img/atm-node-icon.png",
                     iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                     iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                     popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                     });

var branchIcon = L.icon({
                     iconName: "BRANCH_NODE_ICON",
                     iconUrl: "/img/branch-node-icon.png",
                     iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                     iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                     popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                     });

L.marker([45.4235519,-75.6825088], {icon: atmIcon}).addTo(map).bindPopup('<b>CBA ATM</b> <br> 57 Louis-Pasteur Private<br> University of Ottawa <br> Ottawa, ON K1N 6N5 <br> Canada').openPopup();

L.marker([45.419478, -75.678925], {icon: atmIcon}).addTo(map).bindPopup('<b>CBA ATM</b> <br> SITE <br>University of Ottawa <br> Ottawa, ON K1N 6N5 <br> Canada').openPopup();

L.marker([45.425705,-75.681586], {icon: branchIcon}).addTo(map).bindPopup('<b>CBA</b> <br> 226 Laurier Ave E <br> Ottawa, ON K1N 6P2 <br> Canada <br> Open today <b>8:00 am – 5:00 pm</b>').openPopup();

L.marker([45.418823, -75.687519], {icon: branchIcon}).addTo(map).bindPopup('<b>CBA</b> <br> 88 Somerset St W <br> Ottawa, ON K2P 0H5 <br> Canada <br> Open today <b>8:00 am – 5:00 pm</b>').openPopup();
