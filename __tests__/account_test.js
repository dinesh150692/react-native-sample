import React from 'react';
import Account from '../src/components/account';
import renderer from 'react-test-renderer';

const navigation = { 
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn()
};
test('renders correctly', () => {
  const tree = renderer.create(<Account  navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
