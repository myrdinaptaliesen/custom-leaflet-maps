// Créer une carte Leaflet centrée sur Paris
var map = L.map('map').setView([48.856614, 2.3522219], 13);

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Ajouter un événement "click" à la carte
// map.on('click', function(e) {
//     // Créer un nouveau marqueur à la position cliquée
//     var marker = L.marker(e.latlng).addTo(map);
//     // Récupérer les coordonnées du marqueur
//     var lat = marker.getLatLng().lat;
//     var lng = marker.getLatLng().lng;
//     console.log('Nouveau marqueur placé à la position ' + lat + ', ' + lng);
// });

// Créer un marqueur à la position (48.856614, 2.3522219)
var marker = L.marker([48.856614, 2.3522219], {
    draggable: true
}).addTo(map);

// Fonction appelée lors du début du déplacement du marqueur
function startDragging(e) {
    marker.dragging = true;
    marker.dragStart = e.latlng;
}

// Fonction appelée lors du déplacement du marqueur
function drag(e) {
    if (marker.dragging) {
        var lat = e.latlng.lat - marker.dragStart.lat;
        var lng = e.latlng.lng - marker.dragStart.lng;
        var newLatLng = L.latLng(marker.getLatLng().lat + lat, marker.getLatLng().lng + lng);
        marker.setLatLng(newLatLng);
        marker.dragStart = e.latlng;

    }

}

// Fonction appelée à la fin du déplacement du marqueur
function stopDragging(e) {
    marker.dragging = false;
    marker.dragStart = null;

    var lat = marker.getLatLng().lat;
    var lng = marker.getLatLng().lng;
    console.log('Nouveau marqueur placé à la position ' + lat + ', ' + lng);
}

// Ajouter les événements de glisser-déposer au marqueur
marker.on('mousedown', startDragging);
marker.on('mousemove', drag);
marker.on('mouseup', stopDragging);