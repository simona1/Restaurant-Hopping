export default function fetchPlaces(lat, lng) {
  console.log(lat, lng);
  return function(dispatch) {
    var request = {
      location: {lat, lng},
      radius: '500',
      type: ['restaurant'],
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat, lng},
      zoom: 15,
    });

    var createMarker = place => {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      });
    };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      console.log(results);
      dispatch({
        type: 'FETCH_PLACES',
        places: results,
      });
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }
    });
  }

}
