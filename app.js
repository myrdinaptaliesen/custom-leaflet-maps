//Récupération des coordonnées geolocalisées
function getLatLong(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                callback(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
                callback(48.866667, 2.333333);
            }
        );
    } else {
        console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
}

// Utilisez la fonction getLatLong avec une fonction de rappel pour récupérer les coordonnées
getLatLong(function(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Création du marqueur
    var marker = L.marker([latitude, longitude], {
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
});