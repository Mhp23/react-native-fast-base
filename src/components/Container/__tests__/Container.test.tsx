import React from 'react';
import {Container} from '..';
import {Dimensions, Platform, Text} from 'react-native';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

const DEVICE_HEIGHT = Dimensions.get('window').height;

describe('Container component', () => {
  it('should match snapshot', () => {
    const rendered = render(
      <Container>
        <Text>Hello Container!</Text>
      </Container>,
    ).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should be height varies for each platform', () => {
    const isIOS = Platform.OS === 'ios';
    const rendered = render(<Container />);
    const containerComponent = rendered.getByTestId('FAST_BASE_CONTAINER');

    expect(containerComponent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: isIOS ? DEVICE_HEIGHT - 20 : DEVICE_HEIGHT,
        }),
      ]),
    );
  });
});
