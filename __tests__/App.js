import 'react-native';
import React from 'react';
import App from '../src/App';
import renderer from 'react-test-renderer';

jest.mock('react-native-camera', () => require.requireActual('../__mocks__/camera').default);

jest.mock('react-native-system-setting', () => ({
  switchLocation: jest.fn(),
  isLocationEnabled: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
  check: jest.genMockFn().mockReturnValue(Promise.resolve()), 
  request: jest.genMockFn().mockReturnValue(Promise.resolve()),
  openSettings: jest.genMockFn().mockReturnValue(Promise.resolve()),
}));

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
