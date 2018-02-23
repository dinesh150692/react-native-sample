import React from 'react';
import Terminal from '../src/components/terminal';
import renderer from 'react-test-renderer';

jest.mock('react-native-camera', () => require.requireActual('../__mocks__/camera').default)

test('renders correctly', () => {
  const tree = renderer.create(<Terminal />).toJSON();
  expect(tree).toMatchSnapshot();
});
