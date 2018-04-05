import {combineReducers} from 'redux';
import locationNameReducer from './locationName';

const rootReducer = combineReducers({
  locationName: locationNameReducer,
});

export default rootReducer;
