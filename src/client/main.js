// @flow

import GMap from './GMap';
import PlaceForm from './PlaceForm';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import nullthrows from 'nullthrows';
import Store from './Store';

type Props = {};

type State = {
  error: ?Error,
  location: ?{
    latitude: number,
    longitude: number,
  },
  isUsingGeolocation: boolean,
  locationOverride: string,
};

class Geo extends React.Component<Props, State> {
  render() {
    return (
      <Provider store={Store}>
        <div>
          <h1>Restaurant Hopping</h1>
          <PlaceForm />
          <GMap />
        </div>
      </Provider>
    );

    let errorMessage = null;
    if (error) {
      errorMessage = <div>Error: {error.message}</div>;
    }

    return (
      <React.Fragment>
        {errorMessage}
      </React.Fragment>
    );
  }
}

window.onload = function() {
  const appContainer = nullthrows(document.getElementById('app'));
  ReactDOM.render(<Geo />, appContainer);
};
