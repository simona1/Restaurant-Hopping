import React from 'react';
import PlaceForm from '../src/client/PlaceForm.js';
import { shallow, mount, render } from 'enzyme';

describe('PlaceForm', () => {
  it('should be defined', () => {
    expect(PlaceForm).toBeDefined();
  });
  it('renders correctly', () => {
    const tree = shallow(
      <PlaceForm />
    );
    expect(tree).toMatchSnapshot();
  });

  it('should contain node with id place', () => {
    const wrapper = shallow(<PlaceForm />);
    expect(wrapper.contains('#place'));
  });
});

describe('PlaceForm', () => {
  let app;
  beforeEach( () =>  {
    app = shallow(<PlaceForm />)
  });
  it ('PlaceForm renders nested components', () => {
    expect(app.find('#place').length).toEqual(1);
    expect(app.find('form').length).toEqual(1);
  });

  it('should change state value', () => {
    const event = {
      preventDefault() {},
      target: {value: 'New World'}
    };
    const wrapper = mount(<PlaceForm />);
    const res = wrapper.find('input');
    res.simulate('change', event);
    expect(wrapper.state().value).toEqual('New World');
  });
});
