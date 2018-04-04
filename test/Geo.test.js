import React from 'react';
import Geo from '../src/client/main.js';
import { shallow } from 'enzyme';

test('renders welcome message', () => {
  const wrapper = shallow(
     <Geo />
  );
  expect(wrapper.find('h1').text()).toEqual('Welcome to Restaurants!!');
});
