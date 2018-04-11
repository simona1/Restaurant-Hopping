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

function getPredictionsHelper(query, callback) {
  promisePlacePredictions(query).then(callback);
}

const promisePlacePredictions = memoize(function(query) {
  return new Promise((resolve, reject) => {
    Places.getPredictions(
      query,
      results => {
        resolve(results);
      },
      new RegExp('//'),
    );
  });
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

const promiseGetPlace = memoize(function(placeId) {
  return new Promise((resolve, reject) => {
    Places.getPlace(
      {
        placeId,
      },
      result => {
        resolve(result);
      },
    );
  });
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

function runTSP(restaurantsCache) {
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
  return places;
}

// TODO: reaserch how to properly memoize it
const promiseFetchPlaces = function(map, callback) {
  const places = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    places.nearbySearch(
      {bounds: map.getBounds(), openNow: true, types: ['bar', 'restaurant']},
      function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        }
      },
    );
  });
};

function fetchPlaces() {
  let restaurantsCache;
  return function(dispatch, getState) {
    const {map} = getState();
    promiseFetchPlaces(map).then(results => {
      restaurantsCache = results.filter(res => res);
      const places = runTSP(restaurantsCache);
      dispatch({
        type: 'RECEIVE_PLACES',
        places,
      });
    });
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
