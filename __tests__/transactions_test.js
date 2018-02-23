// __tests__/Intro-test.js
import React from 'react';
import Transactions from '../src/components/transactions';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Transactions />).toJSON();
  expect(tree).toMatchSnapshot();
});