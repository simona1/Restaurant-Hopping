/*global google*/
import React from 'react';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import PlaceForm from '../client/PlaceForm';
import {Provider} from 'redux';

//const store = {};

describe('Renders default PlaceForm', () => {
  it('should be defined', () => {
    expect(PlaceForm).toBeDefined();
  });
  xit('should render without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <PlaceForm />
      </Provider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  xit('should contain nested nodes', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <PlaceForm />
      </Provider>,
    );
    expect(wrapper.contains('#place'));
    expect(wrapper.contains('form'));
  });
});
