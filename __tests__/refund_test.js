import React from 'react';
import Refund from '../src/components/Refund';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Refund />).toJSON();
  expect(tree).toMatchSnapshot();
});