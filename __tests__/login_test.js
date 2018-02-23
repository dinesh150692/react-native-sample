import React from 'react';
import Login from '../src/components/login';
import renderer from 'react-test-renderer';

const navigation = { 
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn()
};
test('renders correctly', () => {
  const tree = renderer.create(<Login  navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
