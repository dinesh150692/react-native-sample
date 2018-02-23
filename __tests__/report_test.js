import React from 'react';
import Report from '../src/components/reports';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Report />).toJSON();
  expect(tree).toMatchSnapshot();
});
