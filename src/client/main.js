// @flow

import Geo from './Geo';
import React from 'react';
import ReactDOM from 'react-dom';
import nullthrows from 'nullthrows';

type Props = {};

window.onload = function() {
  const appContainer = nullthrows(document.getElementById('app'));
  ReactDOM.render(<Geo />, appContainer);
};
