import React from 'react';
import {Icon} from '..';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

const onPress = jest.fn();

describe('Icon component', () => {
  it('should match snapshot', () => {
    const rendered = render(<Icon name="x" size={3} type="Feather" />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render button as wrapper for icon component', () => {
    const rendered = render(
      <Icon name="x" size={3} type="Feather" onPress={onPress} />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should be render disabled behavior correctly', () => {
    const defaultIconColor = 'rgb(220,220,220)';
    const rendered = render(
      <Icon disabled name="x" size={3} type="Feather" onPress={onPress} />,
    );

    const iconComponent = rendered.getByTestId('FAST_BASE_ICON');

    expect(iconComponent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: defaultIconColor}),
      ]),
    );
  });

  it('should render wrapperStyle for icon wrapper', () => {
    const backgroundColor = 'yellow';
    const rendered = render(
      <Icon
        name="x"
        size={3}
        type="Feather"
        wrapperStyle={{backgroundColor}}
      />,
    );
    const IconWrapperComponent = rendered.getByTestId('FAST_BASE_ICON_WRAPPER');
    expect(IconWrapperComponent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor,
        }),
      ]),
    );
  });

  it('should render buttonStyle for icon button', () => {
    const backgroundColor = 'yellow';
    const rendered = render(
      <Icon
        name="x"
        size={3}
        type="Feather"
        onPress={onPress}
        buttonStyle={{backgroundColor}}
      />,
    );
    const IconButtonComponent = rendered.getByTestId('FAST_BASE_ICON_BUTTON');
    expect(IconButtonComponent.props.style).toMatchObject({
      backgroundColor,
    });
  });
});
