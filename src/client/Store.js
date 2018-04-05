import {createStore} from 'redux';
import rootReducer from './reducers/root';

const Store = createStore(
  rootReducer,
  {},
  window.devToolsExtension && window.devToolsExtension(),
);

window.Store = Store;

export default Store;
