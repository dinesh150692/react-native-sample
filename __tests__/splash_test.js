import React from 'react';
import splashScreen from '../src/components/splashScreen';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<splashScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
