import {PlacesList} from '../client/PlacesList';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const testPlaces = [
  {
    id: 'ChIJZ5XfV10GhYARDh2gyITiZGw',
    name: 'Cadet Wine & Beer Bar',
    rating: 4.5,
  },
];

describe('PlacesList', () => {
  it('should be defined', () => {
    expect(PlacesList).toBeDefined();
  });
  it('should render a <PlaceList />', () => {
    const component = shallow(<PlacesList places={testPlaces} />);
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should contain a ordered list element', () => {
    const component = shallow(<PlacesList places={testPlaces} />);
    expect(component.contains('ol'));
  });
  it('should contain list item elements', () => {
    const component = shallow(<PlacesList places={testPlaces} />);
    expect(component.contains('li'));
  });
  it('should contain icon elements', () => {
    const component = shallow(<PlacesList places={testPlaces} />);
    expect(component.contains('i'));
  });
  it('should contain paragraph elements', () => {
    const component = shallow(<PlacesList places={testPlaces} />);
    expect(component.contains('p'));
  });
});
