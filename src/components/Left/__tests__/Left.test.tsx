import React from 'react';
import {Left} from '..';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

describe('Left component', () => {
  it('should match snapshot', () => {
    const rendered = render(<Left />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render center styles correctly', () => {
    const rendered = render(<Left />);
    const centerComponent = rendered.getByTestId('FAST_BASE_LEFT');
    expect(centerComponent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flex: 1,
          alignSelf: 'center',
          alignItems: 'flex-start',
        }),
      ]),
    );
  });
});
