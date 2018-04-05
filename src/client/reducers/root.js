/*global google*/
import {combineReducers} from 'redux';
import locationQueryReducer from './locationQuery';
import coordinatesReducer from './coordinates';
import locationNameReducer from './locationName';
//import restaurantsQueryReducer from './restaurantsQuery';

const rootReducer = combineReducers({
  coordinates: coordinatesReducer,
  locationQuery: locationQueryReducer,
  locationName: locationNameReducer,
  //  restaurants: restaurantsQueryReducer,
});

export default rootReducer;
