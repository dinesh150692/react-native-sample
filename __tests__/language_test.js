import React from 'react';
import Language from '../src/components/language';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Language />).toJSON();
  expect(tree).toMatchSnapshot();
});
