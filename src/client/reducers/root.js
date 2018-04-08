/*global google*/
import {combineReducers} from 'redux';
import locationQueryReducer from './locationQuery';
import coordinatesReducer from './coordinates';
import locationNameReducer from './locationName';
import placesReducer from './placesList';

const rootReducer = combineReducers({
  coordinates: coordinatesReducer,
  locationQuery: locationQueryReducer,
  locationName: locationNameReducer,
  places: placesReducer,
});

export default rootReducer;
