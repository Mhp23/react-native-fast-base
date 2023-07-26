import React from 'react';
import Button from '..';
import {Platform} from 'react-native';
import MockedProvider from '../../../helpers/MockedProvider';
import {render, cleanup} from '@testing-library/react-native';

const BUTTON_ID = 'FAST_BASE_BUTTON';

afterEach(cleanup);

describe('Button component', () => {
  it('should render correcly', () => {
    const rendered = render(
      <MockedProvider>
        <Button title="Press Me!" />
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render shadow only in solid mode', () => {
    const rendered = render(<Button title="Press Me!" mode="outline" shadow />);
    const rendered2 = render(
      <Button title="Press Me!" mode="transparent" shadow />,
    );
    const buttonComponent = rendered.getByTestId(BUTTON_ID);
    const buttonComponent2 = rendered2.getByTestId(BUTTON_ID);
    const expected =
      Platform.OS === 'ios'
        ? expect.not.objectContaining({
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          })
        : expect.not.objectContaining({
            elevation: 3,
          });

    expect(buttonComponent.props.style).toEqual(expected);
    expect(buttonComponent2.props.style).toEqual(expected);
  });

  it('should render low shadow correctly', () => {
    const rendered = render(<Button title="Press Me!" shadow />);
    const buttonComponent = rendered.getByTestId(BUTTON_ID);
    expect(buttonComponent.props.style).toEqual(
      Platform.OS === 'ios'
        ? expect.objectContaining({
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          })
        : expect.objectContaining({
            elevation: 3,
          }),
    );
  });

  it('should render medium shadow correctly', () => {
    const rendered = render(<Button title="Press Me!" shadow="medium" />);
    const buttonComponent = rendered.getByTestId(BUTTON_ID);
    expect(buttonComponent.props.style).toEqual(
      Platform.OS === 'ios'
        ? expect.objectContaining({
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          })
        : expect.objectContaining({
            elevation: 5,
          }),
    );
  });

  it('should render high shadow shadow correctly', () => {
    const rendered = render(<Button title="Press Me!" shadow="high" />);
    const buttonComponent = rendered.getByTestId(BUTTON_ID);
    expect(buttonComponent.props.style).toEqual(
      Platform.OS === 'ios'
        ? expect.objectContaining({
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
          })
        : expect.objectContaining({
            elevation: 10,
          }),
    );
  });
});
