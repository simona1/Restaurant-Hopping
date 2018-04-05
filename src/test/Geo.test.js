/*global google*/
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import configureStore from 'redux-mock-store';
import store from '../client/Store';
import Geo from '../client/main.js';

xdescribe('Geo test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Geo />
      </Provider>,
      div,
    );
  });
});

xdescribe('renders as expected', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Geo />
    </Provider>,
  );
  it('renders the connected component', () => {
    expect(wrapper.find(Geo).length).toEqual(1);
  });
});
