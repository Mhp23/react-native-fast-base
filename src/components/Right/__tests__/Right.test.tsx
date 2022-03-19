import React from 'react';
import {Right} from '..';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

describe('Right component', () => {
  it('should match snapshot', () => {
    const rendered = render(<Right />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render center styles correctly', () => {
    const rendered = render(<Right />);
    const centerComponent = rendered.getByTestId('FAST_BASE_RIGHT');
    expect(centerComponent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flex: 1,
          alignSelf: 'center',
          alignItems: 'flex-end',
        }),
      ]),
    );
  });
});
