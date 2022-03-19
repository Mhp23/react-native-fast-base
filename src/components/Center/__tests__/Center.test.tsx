import React from 'react';
import {Center} from '..';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

describe('Center component', () => {
  it('should match snapshot', () => {
    const rendered = render(<Center />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render center styles correctly', () => {
    const rendered = render(<Center />);
    const centerComponent = rendered.getByTestId('FAST_BASE_CENTER');
    expect(centerComponent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
        }),
      ]),
    );
  });
});
