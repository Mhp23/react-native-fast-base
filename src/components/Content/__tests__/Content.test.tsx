import React from 'react';
import {Content} from '..';
import {render, cleanup} from '@testing-library/react-native';
import {Text} from 'react-native';

afterEach(cleanup);

beforeAll(() => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => {
    const Platform = jest.requireActual(
      'react-native/Libraries/Utilities/Platform',
    );
    Platform.constants.reactNativeVersion = {major: 0, minor: 64, patch: 0};
    return Platform;
  });
});

const mockedData = [
  {
    value: 'first',
  },
  {
    value: 'second',
  },
  {
    value: 'third',
  },
];

describe('Content component', () => {
  it('should match snapshot', () => {
    const rendered = render(
      <Content>
        {mockedData.map(({value}, index) => {
          return (
            <Text key={index} testID={`TEST_TEXT_${index}`}>
              {value}
            </Text>
          );
        })}
      </Content>,
    ).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
