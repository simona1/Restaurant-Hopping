import Geo from './Geo';
import React from 'react';
import ReactDOM from 'react-dom';
import nullthrows from 'nullthrows';

window.onload = function() {
  const appContainer = nullthrows(document.getElementById('app'));
  ReactDOM.render(<Geo />, appContainer);
};
