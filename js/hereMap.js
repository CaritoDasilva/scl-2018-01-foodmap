// window.onload = () => {
//   findPlaces();
// };
let watchPosition = null;
var platform = new H.service.Platform({
  app_id: 'KbDHjNISMuVTjdoKmgxY', // // <-- ENTER YOUR APP ID HERE
  app_code: 'XeXXApChvfAPneASBW_6zg', // <-- ENTER YOUR APP CODE HERE
});

let HEREHQcoordinates = null;

// Inicializa el mapa

var defaultLayers = platform.createDefaultLayers();
var mapPlaceholder = document.getElementById('mapContainer');


// Ajusta el mapa al tamaño de la pantalla

window.addEventListener('resize', function () {
  map.getViewPort().resize();
});

// Establecemos las coordenadas del mapa

var coordinates = {
  lat: -33.43727, // Plaza de Armas
  lng: -70.65056
};

var mapOptions = {
  center: coordinates,
  zoom: 14
}

// Se inicializa el mapa
var map = new H.Map(
  mapContainer,
  defaultLayers.normal.map,
  mapOptions);

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)); //mueve el mapa, lo hace interactivo
// Agrego un marcador

var marker = new H.map.Marker(coordinates);
map.addObject(marker);

var iconUrl = './images/marker-gelato.svg';

var iconOptions = {
  // The icon's size in pixel:
  size: new H.math.Size(26, 34),
  // The anchorage point in pixel, 
  // defaults to bottom-center
  anchor: new H.math.Point(14, 34)
};

var markerOptions = {
  icon: new H.map.Icon(iconUrl, iconOptions)
};

var markers = [];
var marker = new H.map.Marker(coordinates, markerOptions);
map.addObject(marker);

function updatePosition(event) {
  HEREHQcoordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  var marker = new H.map.Marker(HEREHQcoordinates);
  map.addObject(marker);
  map.setCenter(HEREHQcoordinates);
}
navigator.geolocation.watchPosition(updatePosition);

searchBtn.addEventListener("click", () => {
  // console.log(explorer);
  map.removeObjects(markers); //remueve marcadores cuando cambias de geolocalización
  markers = []; //almacena los marcadores 
  fetch(`https://places.cit.api.here.com/places/v1/discover/search?app_id=wmLh9WIylelp0l6KdZF9&app_code=vXvdui0ls0FvJ0DrA7PY5g&at=${HEREHQcoordinates.lat},${HEREHQcoordinates.lng}&pretty&q=${inputSearching.value}`)
    .then(response => response.json())
    .then(explorer => {
      //recorrer items para la info de los restaurantes
      explorer.results.items.forEach((item) => {
        console.log(explorer);


        let coords = {
          lng: item.position[1],
          lat: item.position[0]
        }
        var marker = new H.map.Marker(coords);
        markers.push(marker);
        map.addObject(marker);
      });
    })
});