import googlePlacesService from 'google-places-autocomplete-service';
import tsp from '../tsp';

const TSP_LIMIT = 5;

const Places = new googlePlacesService({
  type: 'geocode',
  filterByCountry: 'US',
  outputPlaceTypes: ['locality'],
  searchStrategies: ['searchByPlaceId'],
});

const predictionsCache = {};
function getPredictionsHelper(query, callback) {
  if (predictionsCache.hasOwnProperty(query)) {
    console.log('skipping API query!');
    setTimeout(() => callback(predictionsCache[query]), 0);
  }

  Places.getPredictions(
    query,
    results => {
      predictionsCache[query] = results;
      callback(results);
    },
    new RegExp('//'),
  );
}

function predictPlace(query) {
  return function(dispatch) {
    if (query === '') {
      // Nothing to predict...
      return;
    }

    getPredictionsHelper(query, results => {
      Object.entries(results).some(result => {
        const [placeID, details] = result;
        if (details.type === 'locality') {
          dispatch(fetchCoordinates(placeID));
          return true;
        }
      });
    });
  };
}

const placeCache = {};
function getPlaceHelper(placeId, callback) {
  if (placeCache.hasOwnProperty(placeId)) {
    console.log('skipping API query!');
    setTimeout(() => callback(placeCache[placeId]), 0);
  }

  Places.getPlace(
    {
      placeId,
    },
    result => {
      placeCache[placeId] = result;
      callback(result);
    },
  );
}

function fetchCoordinates(placeId) {
  return function(dispatch) {
    getPlaceHelper(placeId, res => {
      if (!res || !res.coords) {
        return;
      }
      const [latitude, longitude] = res.coords.split(', ');
      dispatch({
        type: 'UPDATE_COORDINATES',
        coordinates: {latitude, longitude},
      });

      dispatch(fetchPlaces());
    });
  };
}

function fetchPlaces() {
  return function(dispatch, getState) {
    const {coordinates, map} = getState();
    const {latitude, longitude} = coordinates;

    const places = new google.maps.places.PlacesService(map);

    // TODO: cache nearby searches
    let restaurantsCache;

    places.nearbySearch(
      {bounds: map.getBounds(), openNow: true, types: ['bar', 'restaurant', 'point_of_interest']},
      function(results, status) {
        console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          restaurantsCache = results.filter(res => res);
          console.log('Got these:', restaurantsCache);
          const places = tsp(
            results.slice(0, TSP_LIMIT).map(result => {
              return {
                id: result.place_id,
                latitude: result.geometry.location.lat(),
                longitude: result.geometry.location.lng(),
                name: result.name,
                rating: result.rating,
              };
            }),
          );

          dispatch({
            type: 'RECEIVE_PLACES',
            places,
          });
        }
      },
    );
  };
}

export default function updateLocationQuery(locationQuery) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_LOCATION_QUERY',
      locationQuery,
    });

    dispatch(predictPlace(locationQuery));
  };
}
