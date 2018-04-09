export default function fetchPlaces(lat, lng) {
  console.log(lat, lng);
  return function(dispatch) {
    const request = {
      location: {lat, lng},
      radius: '200',
      type: ['restaurant'],
    };

    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat, lng},
      zoom: 15,
    });

    const createMarker = place => {
      const placeLoc = place.geometry.location;
      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      });
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      console.log(results);
      dispatch({
        type: 'FETCH_PLACES',
        places: results,
      });
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          createMarker(results[i]);
        }
      }
    });
  };
}
