import Rating from '../client/Rating';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const testProps = [
  {
    id: 'ChIJZ5XfV10GhYARDh2gyITiZGw',
    rating: 4.5,
  },
];

describe('Rating', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Rating id={testProps.id} rating={testProps.rating} />);
  });
  it('should render a <Rating />', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should contain a span element', () => {
    expect(component.contains('span'));
  });
  it('has length', () => {
    expect(component.find('span').length).toEqual(1);
  });
  it('should contain nested elements', () => {
    expect(component.contains('i'));
  });
});
