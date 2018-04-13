import React from 'react';

export default class Rating extends React.Component<Props> {
  render() {
    const {rating, id} = this.props;
    const stars = [];
    for (let i = 0; i < rating; ++i) {
      stars.push(
        <i key={`${id}-${i}`} className="material-icons md-icon dp18">
          grade
        </i>,
      );
    }
    return (
      <span
        className="item-rating"
        style={{width: Math.floor(24 * rating) + 'px'}}>
        {stars}
      </span>
    );
  }
}
