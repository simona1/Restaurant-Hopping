import {combineReducers} from 'redux';
import coordinatesReducer from './coordinates';
import locationNameReducer from './locationName';
import locationQueryReducer from './locationQuery';
import mapReducer from './map';
import placesReducer from './placesList';

const rootReducer = combineReducers({
  coordinates: coordinatesReducer,
  locationName: locationNameReducer,
  locationQuery: locationQueryReducer,
  map: mapReducer,
  places: placesReducer,
});

export default rootReducer;
