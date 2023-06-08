import React from 'react';
import Text from '..';
import {rs} from 'react-native-full-responsive';
import MockedProvider from '../../../helpers/MockedProvider';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

const TextID = 'FAST_BASE_TEXT';

const defaultSize = 14;

describe('Text component', () => {
  it('should match snapshot', () => {
    const rendered = render(
      <MockedProvider>
        <Text size={defaultSize}>It's fast base text!</Text>
      </MockedProvider>,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should render default font size correctly', () => {
    const calculatedFontSize = rs(defaultSize);
    const {getByTestId} = render(
      <Text size={defaultSize}>It's fast base text!</Text>,
    );
    const textComponent = getByTestId(TextID);
    expect(textComponent.props.style).toMatchObject({
      fontSize: calculatedFontSize,
    });
  });

  it('should render props correctly', () => {
    const calculatedFontSize = rs(defaultSize);
    const rendered = render(
      <MockedProvider>
        <Text<'MyFont1' | 'MyFont2' | 'MyFont3'>
          size={defaultSize}
          font="MyFont2"
          color="red">
          It's fast base text!
        </Text>
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    const textComponent = rendered.getByTestId(TextID);
    expect(textComponent.props.style).toMatchObject({
      color: 'red',
      fontFamily: 'MyFont2',
      fontSize: calculatedFontSize,
    });
  });
});
