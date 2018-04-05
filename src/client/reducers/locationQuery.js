/*global google*/
import googlePlacesService from 'google-places-autocomplete-service';

const Places = new googlePlacesService({
  type: 'geocode',
  outputPlaceTypes: ['locality'],
  searchStrategies: ['searchByPlaceId'],
});
window.Places = Places;

function searchPlace(placeId) {
  Places.getPlace(
    {
      placeId,
    },
    res => {
      if (!res || !res.coords) {
        return;
      }
      console.log(res);
      const [latitude, longitude] = res.coords.split(', ');
      const Store = require('../Store').default;
      Store.dispatch({
        type: 'UPDATE_COORDINATES',
        coordinates: {latitude, longitude},
      });
    },
  );
}

function predictPlace(query) {
  Places.getPredictions(
    query,
    results => {
      Object.entries(results).some(result => {
        const [placeID, details] = result;
        console.log('Details ', details);
        if (details.type === 'locality') {
          searchPlace(placeID);
          return true;
        }
      });
    },
    new RegExp('//'),
  );
}

export default function(locationQuery = 'Palo Alto', action) {
  if (action.type === 'UPDATE_LOCATION_QUERY') {
    predictPlace(action.locationQuery);
    return action.locationQuery;
  }
  return locationQuery;
}
