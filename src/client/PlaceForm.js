import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import React from 'react';
import {connect} from 'react-redux';

import GOOGLE_API_KEY from '../../api_key';

import updateLocationQuery from './actions/updateLocationQuery';

class PlaceForm extends React.Component<Props> {
  render() {
    return (
      <form className="input-field">
        <i className="material-icons prefix">search</i>
        <input
          type="text"
          id="place"
          placeholder="search for establishments nearby"
          value={this.props.locationQuery}
          onChange={this._handleLocationQueryChange}
        />
      </form>
    );
  }

  _handleLocationQueryChange = event => {
    this.props.onLocationQueryChange(event.target.value);
  };
}

function mapStateToProps(state) {
  return {
    locationQuery: state.locationQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLocationQueryChange: locationQuery =>
      dispatch(updateLocationQuery(locationQuery)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);
