import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {PlacesList} from '../client/PlacesList';
import {Provider} from 'redux';
//import store from '../client/Store';
import configureStore from 'redux-mock-store';

describe('PlacesList', () => {
  it('should be defined', () => {
    expect(PlacesList).toBeDefined();
  });
});
