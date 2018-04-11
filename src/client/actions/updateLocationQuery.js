/*global google*/
import googlePlacesService from 'google-places-autocomplete-service';
import tsp from '../tsp';
import {debounce, memoize} from 'lodash';

const TSP_LIMIT = 5;

const Places = new googlePlacesService({
  type: 'geocode',
  filterByCountry: 'US',
  outputPlaceTypes: ['locality'],
  searchStrategies: ['searchByPlaceId'],
});

const predictionsCache = {};
function getPredictionsHelper(query, callback) {
  promisePlacePredictions(query).then(callback);
}

const promisePlacePredictions = memoize(function(query) {
  if (!predictionsCache.hasOwnProperty(query)) {
    predictionsCache[query] = new Promise((resolve, reject) => {
      Places.getPredictions(
        query,
        results => {
          resolve(results);
        },
        new RegExp('//'),
      );
    });
  }
  return predictionsCache[query];
});

const predictPlaceImplementation = debounce(function(dispatch, query) {
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
      return false;
    });
  });
}, 500);

function predictPlace(query) {
  return dispatch => predictPlaceImplementation(dispatch, query);
}

const placeCache = {};
const promiseGetPlace = memoize(function(placeId) {
  if (!placeCache.hasOwnProperty(placeId)) {
    placeCache[placeId] = new Promise((resolve, reject) => {
      Places.getPlace(
        {
          placeId,
        },
        result => {
          resolve(result);
        },
      );
    });
  }
  return placeCache[placeId];
});

function getPlaceHelper(placeId, callback) {
  promiseGetPlace(placeId).then(callback);
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
    const {map} = getState();
    const places = new google.maps.places.PlacesService(map);
    // cache nearby searches
    let restaurantsCache;
    places.nearbySearch(
      {bounds: map.getBounds(), openNow: true, types: ['bar', 'restaurant']},
      function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          restaurantsCache = results.filter(res => res);
          const places = tsp(
            restaurantsCache.slice(0, TSP_LIMIT).map(result => {
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
