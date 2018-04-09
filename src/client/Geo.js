// @flow

import GMap from './GMap';
import PlaceForm from './PlaceForm';
import PlacesList from './PlacesList';
import React from 'react';
import {Provider} from 'react-redux';

import Store from './Store';

type Props = {};

class Geo extends React.Component<Props> {
  render() {
    return (
      <Provider store={Store}>
        <div>
          <h1>Restaurant Hopping</h1>
          <PlaceForm />
          <div style={{display: 'flex'}}>
            <div
              style={{flexBasis: '80%', position: 'relative', height: '400px'}}>
              <GMap />
            </div>
            <div style={{flexBasis: '20%'}}>
              <PlacesList />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Geo;
