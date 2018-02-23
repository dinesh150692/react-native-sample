import React from 'react';
import Home from '../src/components/home';
import renderer from 'react-test-renderer';

const navigation = { 
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn()
};
test('renders correctly', () => {
  const tree = renderer.create(<Home  navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
