import React from 'react';
import MapMyStore from '../src/components/mapmystore';
import renderer from 'react-test-renderer';

jest.mock('react-native-system-setting', () => ({
    switchLocation: jest.fn(),
    isLocationEnabled: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
    check: jest.genMockFn().mockReturnValue(Promise.resolve()), 
    request: jest.genMockFn().mockReturnValue(Promise.resolve()),
    openSettings: jest.genMockFn().mockReturnValue(Promise.resolve()),
}));

test('renders correctly', () => {
  const tree = renderer.create(<MapMyStore />).toJSON();
  expect(tree).toMatchSnapshot();
});
