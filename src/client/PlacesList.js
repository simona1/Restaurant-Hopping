import React from 'react';
import {connect} from 'react-redux';

type Props = {};

export class PlacesList extends React.Component<Props> {
  render() {
    // TODO: show something interesting when there are no places yet
    return (
      <ol type="A">
        {this.props.places.map(place => (
          <li key={place.id}>
            <p>{place.name}</p>
            {this._renderRating(place.rating, place.id)}
          </li>
        ))}
      </ol>
    );
  }

  _renderRating(rating, id) {
    const stars = [];
    for (let i = 0; i < rating; ++i) {
      stars.push(<i className="material-icons md-icon dp18">grade</i>);
    }
    return (
      <span
        className="item-rating"
        key={id}
        style={{width: Math.floor(24 * rating) + 'px'}}>
        {stars}
      </span>
    );
  }
}

function mapStateToProps(state) {
  const {places} = state;
  return {places};
}

export default connect(mapStateToProps)(PlacesList);
