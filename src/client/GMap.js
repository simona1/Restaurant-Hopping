import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../../api_key';
import {connect} from 'react-redux';
import store from './Store';
import fetchPlaces from './actions/fetchPlaces';

var google = window.google;

class GMap extends React.Component {
  componentDidMount() {
    const {latitude: lat, longitude: lng} = this.props.coordinates;
    store.dispatch(fetchPlaces(lat, lng));
  }

  render() {
    const {latitude: lat, longitude: lng} = this.props.coordinates;
    return (
      <React.Fragment>
        <div id="map" />
        <Map
          google={google}
          zoom={10}
          center={{lat, lng}}
          initialCenter={{lat, lng}}>
          <Marker name="loc" />
        </Map>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    coordinates: state.coordinates,
    places: state.places,
  };
}

export default connect(mapStateToProps)(
  GMap,
  GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY,
    libraries: ['places'],
  })(GMap),
);
