// @flow
import React from 'react';

type Props = {};

type State = {
  value: string,
};

class PlaceForm extends React.Component<Props, State> {
  state = {value: ''};

  _handleChange = (event: Event): void => {
    event.preventDefault();
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit} className="input-field">
        <i className="material-icons prefix">search</i>
        <input
          type="text"
          id="place"
          placeholder="pick a place to search for nearby establishments"
          value={this.state.value}
          onChange={this._handleChange}
        />
      </form>
    );
  }
}

export default PlaceForm;
