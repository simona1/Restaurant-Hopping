import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../../api_key';

import {connect} from 'react-redux';

class GMap extends React.Component {
  render() {
    const {latitude: lat, longitude: lng} = this.props.coordinates;

    return (
      <Map
        style={{width: '400px', height: '400px'}}
        google={window.google}
        center={{lat, lng}}
        initialCenter={{lat, lng}}
        zoom={10}
      />
    );
  }
}

function mapStateToProps(state) {
  return {coordinates: state.coordinates};
}

export default connect(mapStateToProps)(
  GMap,
  GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY,
    libraries: ['places'],
  })(GMap),
);
