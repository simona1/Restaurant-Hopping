import updateLocationName from '../client/actions/updateLocationName';
import reducer from '../client/reducers/locationName';
import rootReducer from '../client/reducers/rootReducer';

const location = 'New World';

const initialState = {
  locationName: 'San Francisco',
};

describe('rootReducer', () => {
  it('should return an unchanged initial state when action is unknown', () => {
    expect(rootReducer({}, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });
  it('should have initial state', () => {
    expect(rootReducer(initialState, {})).toEqual(initialState);
  });
});

describe('Location name reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('San Francisco');
  });
  it('should handle UPDATE_LOCATION_NAME', () => {
    expect(
      reducer(location, {
        type: updateLocationName.type,
        locationName: location,
      }),
    ).toEqual(location);
  });
});
