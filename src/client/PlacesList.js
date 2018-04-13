import React from 'react';
import {connect} from 'react-redux';
import Rating from './Rating';
type Props = {};

export class PlacesList extends React.Component<Props> {
  render() {
    // TODO: show something interesting when there are no places yet
    return (
      <ol type="A">
        {this.props.places.map(place => (
          <li key={place.id}>
            <p>{place.name}</p>
            <Rating rating={place.rating} id={place.id} />
          </li>
        ))}
      </ol>
    );
  }
}

function mapStateToProps(state) {
  const {places} = state;
  return {places};
}

export default connect(mapStateToProps)(PlacesList);
