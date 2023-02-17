//Récupération des coordonnées geolocalisées
function getLatLong(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                callback(position.coords.latitude, position.coords.longitude);
            },
            //Gestion du refus de géolocalisation
            function(error) {
                callback(48.866667, 2.333333);
            }
        );
    } else {
        //Gestion de non prise en charge de la géolocalisation par le navigateur
        callback(48.866667, 2.333333);
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

    //Ajout d'une infobulle sur le marqueur
    marker.bindPopup("Choisissez votre lieu").openPopup();

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
        document.getElementById("latInput").value = lat;
        document.getElementById("lngInput").value = lng;

    }

    // Ajouter les événements de glisser-déposer au marqueur
    marker.on('mousedown', startDragging);
    marker.on('mousemove', drag);
    marker.on('mouseup', stopDragging);
    marker.on('click', function() {
        marker.closePopup();
    });
});