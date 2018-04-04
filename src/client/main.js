// @flow

import PlaceForm from './PlaceForm';
import React from 'react';
import ReactDOM from 'react-dom';

import nullthrows from 'nullthrows';

type Props = {};

type State = {};

export default class Geo extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>Restaurant Hopping</h1>
        <PlaceForm />
      </div>
    );
  }
}

window.onload = function() {
  const appContainer = nullthrows(document.getElementById('app'));
  ReactDOM.render(<Geo />, appContainer);
};
