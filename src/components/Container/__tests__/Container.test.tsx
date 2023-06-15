import React from 'react';
import Container from '..';
import {Text} from 'react-native';
import {DefaultTheme} from '../../../core';
import MockedProvider from '../../../helpers/MockedProvider';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

describe('Container component', () => {
  it('should render correctly', () => {
    const rendered = render(
      <MockedProvider>
        <Container>
          <Text>Hello Fast Base Container!</Text>
        </Container>
      </MockedProvider>,
    );
    const containerComponent = rendered.getByTestId('FAST_BASE_CONTAINER');
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
    expect(containerComponent.props.style).toMatchObject({
      flex: 1,
      backgroundColor: DefaultTheme.DefaultTheme.colors?.background,
    });
  });
});
