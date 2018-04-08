import {combineReducers} from 'redux';
import coordinatesReducer from './coordinates';
import locationNameReducer from './locationName';
import locationQueryReducer from './locationQuery';
import placesReducer from './placesList';

const rootReducer = combineReducers({
  coordinates: coordinatesReducer,
  locationName: locationNameReducer,
  locationQuery: locationQueryReducer,
  places: placesReducer,
});

export default rootReducer;
