import coordinatesReducer from '../client/reducers/coordinates';
import rootReducer from '../client/reducers/root';
import locationNameReducer from '../client/reducers/locationName';

const initialState = {
  coordinates: {latitude: 37.733795, longitude: -122.446747},
  locationName: 'San Francisco',
  locationQuery: '',
  map: null,
  places: [],
};

const location = 'New World';
const mockCoords = {latitude: 44.733795, longitude: -122.446747};

describe('rootReducer', () => {
  it('should return an unchanged initial state when action is unknown', () => {
    expect(rootReducer({}, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });
  it('should return initial state', () => {
    expect(rootReducer(initialState, {})).toEqual(initialState);
  });
});

describe('coordinatesReducer', () => {
  it('should handle UPDATE_COORDINATES', () => {
    expect(
      coordinatesReducer(mockCoords, {
        type: coordinatesReducer.type,
        coordinates: mockCoords,
      }),
    ).toEqual(mockCoords);
  });
});

describe('locationNameReducer', () => {
  it('should handle UPDATE_LOCATION_NAME', () => {
    expect(
      locationNameReducer(location, {
        type: locationNameReducer.type,
        locationName: location,
      }),
    ).toEqual(location);
  });
});
