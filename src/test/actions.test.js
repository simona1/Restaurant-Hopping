import updateLocationName from '../client/actions/updateLocationName';
import updateCoordinates from '../client/actions/updateCoordinates';

const location = 'New World';
const coords = {lat: 40.7128, lng: -74.006};

describe('update location name action', () => {
  it('should create an action to set the new location', () => {
    const locationName = location;
    const expectedAction = {
      type: 'UPDATE_LOCATION_NAME',
      locationName,
    };
    expect(updateLocationName(locationName)).toEqual(expectedAction);
  });
});

describe('update coordinates action', () => {
  it('should create an action to update the coordinates', () => {
    const coordinates = coords;
    const expectedAction = {
      type: 'UPDATE_COORDINATES',
      coordinates,
    };
    expect(updateCoordinates(coords)).toEqual(expectedAction);
  });
});
