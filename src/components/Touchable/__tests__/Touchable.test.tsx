import React from 'react';
import {Touchable} from '..';
import {Platform, Text} from 'react-native';
import {render, cleanup, fireEvent} from '@testing-library/react-native';

afterEach(cleanup);

const onPress = jest.fn();

const ButtonID = 'FAST_BASE_BUTTON';

describe('Touchable component', () => {
  it('should match snapshot', () => {
    const rendered = render(
      <Touchable onPress={onPress}>
        <Text>Hello Touchable!</Text>
      </Touchable>,
    ).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render shadow correctly', () => {
    const isIOS = Platform.OS === 'ios';
    const rendered = render(<Touchable hasShadow onPress={onPress} />);
    const buttonComponent = rendered.getByTestId(ButtonID);
    expect(buttonComponent.props.style).toMatchObject(
      isIOS
        ? {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
          }
        : {
            elevation: 2,
          },
    );
  });

  it('should render border correctly', () => {
    const rendered = render(
      <Touchable hasBorder borderColor="red" onPress={onPress} />,
    );
    const buttonComponent = rendered.getByTestId(ButtonID);
    expect(buttonComponent.props.style).toMatchObject({
      borderWidth: 1,
      borderColor: 'red',
    });
  });

  it('should disabled property work correctly', () => {
    const rendered = render(<Touchable disabled onPress={onPress} />);
    const buttonComponent = rendered.getByTestId(ButtonID);
    fireEvent.press(buttonComponent);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should render style correctly', () => {
    const backgroundColor = 'red';
    const rendered = render(
      <Touchable style={{backgroundColor}} onPress={onPress} />,
    );
    const buttonComponent = rendered.getByTestId(ButtonID);
    expect(buttonComponent.props.style).toMatchObject({backgroundColor});
  });

  it('should render loader correctly', () => {
    const loadingColor = 'red';
    const rendered = render(
      <Touchable loading loadingColor={loadingColor} onPress={onPress} />,
    );
    const loaderComponent = rendered.getByTestId('BUTTON_LOADER');
    expect(loaderComponent).not.toEqual(undefined);
  });
});
