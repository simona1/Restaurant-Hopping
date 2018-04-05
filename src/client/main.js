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
  _locationWatchID: ?number = null;

  state = {
    error: null,
    location: null,
  };

  componentDidMount() {
    const location = window.navigator.geolocation;
    if (!location) {
      return;
    }

    this._locationWatchID = location.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        this.setState({location: {latitude, longitude}});
      },
      error => this.setState({error}),
      {
        enableHighAccuracy: false,
        maximumAge: Infinity,
        timeout: 5000,
      },
    );
  }

  componentWillUnmount() {
    if (this._locationWatchID) {
      window.navigator.geolocation.clearWatch(this._watchID);
      this._locationWatchID = null;
    }
  }

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

    const {error, location} = this.state;

    let errorMessage = null;
    if (error) {
      errorMessage = <div>Error: {error.message}</div>;
    }

    const content =
      location == null ? (
        <div>Detecting location...</div>
      ) : (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      );

    return (
      <React.Fragment>
        {content}
        {errorMessage}
      </React.Fragment>
    );
  }
}

window.onload = function() {
  const appContainer = nullthrows(document.getElementById('app'));
  ReactDOM.render(<Geo />, appContainer);
};
