function addMarkerToGroup(group, coords, html) {


  var marker = new H.map.Marker(coords);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
  markers.push(marker);
}


function addInfoBubble(map) {
  markers.forEach((marker) => {
    map.removeObjects(markers);
  });
  markers = [];
  placesList.results.items.forEach((item) => {
    var group = new H.map.Group();
    console.log(group);
    coords = {
      lng: item.position[1],
      lat: item.position[0],
    };

    map.addObject(group);

    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener('tap', function (evt) {
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
        // read custom data
        content: evt.target.getData()
      });
      // show info bubble
      ui.addBubble(bubble);
    }, false);

    addMarkerToGroup(group, {
        lat: item.position[0],
        lng: item.position[1],
      },
      `<h4>${item.title}</h4><p>${item.vicinity}</p>`);



  });
}