function addMarkerToGroup(group, coords, html) {


  var marker = new H.map.Marker(coords);
  // add custom data to the marker
  marker.setData(html);
  console.log(html);
  group.addObject(marker);
  markers.push(marker);
}


function addInfoBubble(map) {

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
      `<b></b>${item.title}`);
    console.log(`${JSON.stringify(coords)},${item.title}`);


  });
}






// function searchingResults() {
//   placesList.results.items.forEach((item) => {
//       console.log(item);


//       let coords = {
//         lng: item.position[1],
//         lat: item.position[0],
//       };

//       let id = {
//         id: item.id
//       };
//       console.log(id);

//       let marker = new H.map.Marker(coords, id);
//       marker.setData();
//       group.addObject(marker);
//       console.log(marker);



//       // Create an info bubble object at a specific geographic location:
//       let group = new H.map.Group();
//       map.addObject(group);



//       group.addEventListener('tap', function (evt) {
//         // event target is the marker itself, group is a parent event target
//         // for all objects that it contains
//         let bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
//           // read custom data
//           content: evt.target.getData()
//         });
//         // show info bubble
//         ui.addBubble(bubble);
//       }, false);

//       addMarkerToGroup(group, {
//           coords
//         },
//         '<div><a href=\'http://www.mcfc.co.uk\' >Manchester City</a>' +
//         '</div><div >City of Manchester Stadium<br>Capacity: 48,000</div>');



//     }


//   });
// }