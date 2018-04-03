// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import nullthrows from 'nullthrows';

class Geo extends React.Component {
  render() {
    return (
        <div>
         Welcome to Restaurants!!
        </div>
    );
  }
}

window.onload = function() {
  const appContainer = nullthrows(document.getElementById('app'));
  ReactDOM.render(<Geo />, appContainer);
};
