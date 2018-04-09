import {combineReducers} from 'redux';
import locationQueryReducer from './locationQuery';
import coordinatesReducer from './coordinates';
import locationNameReducer from './locationName';
import mapReducer from './map';
import placesReducer from './places';

const rootReducer = combineReducers({
  coordinates: coordinatesReducer,
  locationQuery: locationQueryReducer,
  locationName: locationNameReducer,
  map: mapReducer,
  places: placesReducer,
});

export default rootReducer;
