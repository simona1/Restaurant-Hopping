/*global google*/
import React from 'react';
import {Map, Marker, Polyline} from 'google-maps-react';
import {connect} from 'react-redux';
import mapLoaded from './actions/mapLoaded';

const ZOOM = 14;

class GMap extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.coordinates.latitude === prevProps.coordinates.latitude &&
      this.props.coordinates.longitude === prevProps.coordinates.longitude
    ) {
      // The coordinates didn't change, nothing to do.
      return;
    }
    this._map && this._map.setZoom(ZOOM);
  }

  render() {
    const {coordinates, places} = this.props;
    const {latitude: lat, longitude: lng} = coordinates;

    const path = places.map(place => ({
      lat: place.latitude,
      lng: place.longitude,
    }));

    return (
      <Map
        google={google}
        onReady={this.props.onMapReady}
        zoom={ZOOM}
        center={{lat, lng}}
        initialCenter={{lat, lng}}>
        {places.map((place, index) => (
          <Marker
            key={place.id}
            label={String.fromCharCode('A'.charCodeAt(0) + index % 26)}
            name={place.name}
            title={place.name}
            position={{lat: place.latitude, lng: place.longitude}}
          />
        ))}
        {places.length > 0 && (
          <Polyline
            key={
              /*
                 There is a bug in the implementation of polyline
                 with responding to prop updates, this is a hack
                 that forces unmounting/remounting.
               */
              JSON.stringify(path)
            }
            path={path}
            strokeColor="blue"
            strokeOpacity={0.8}
            strokeWeight={3}
          />
        )}
      </Map>
    );
  }
}

function mapStateToProps(state) {
  return {
    coordinates: state.coordinates,
    places: state.places,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMapReady: (mapProps, map) => dispatch(mapLoaded(map)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GMap);
