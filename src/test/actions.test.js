import updateLocationName from '../client/actions/updateLocationName';

const location = 'New World';

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
