import React from 'react';
import {connect} from 'react-redux';

type Props = {};

class PlacesList extends React.Component<Props> {
  render() {
    // TODO: show something interesting when there are no places yet

    return (
      <ul>
        {this.props.places.map(place => <li key={place.id}>{place.name}</li>)}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const {places} = state;
  return {places};
}

export default connect(mapStateToProps)(PlacesList);

