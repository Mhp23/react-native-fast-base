import React from 'react';
import Divider from '..';
import {rs} from 'react-native-full-responsive';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

describe('Divider component', () => {
  it('should match snapshot', () => {
    const rendered = render(<Divider width={1} />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render correctly on border mode', () => {
    const rendered = render(<Divider width={1.5} />);
    const dividerComponent = rendered.getByTestId('FAST_BASE_DIVIDER');
    expect(dividerComponent.props.style).toMatchObject({
      borderBottomWidth: rs(1.5),
    });
  });

  it('should render correctly on padding mode in vertical direction', () => {
    const rendered = render(
      <Divider mode="padding" direction="vertical" width={10} />,
    );
    const dividerComponent = rendered.getByTestId('FAST_BASE_DIVIDER');
    expect(dividerComponent.props.style).toMatchObject({
      paddingVertical: rs(10),
    });
  });

  it('should render correctly on padding mode in horizontal direction', () => {
    const rendered = render(
      <Divider mode="padding" direction="horizontal" width={10} />,
    );
    const dividerComponent = rendered.getByTestId('FAST_BASE_DIVIDER');
    expect(dividerComponent.props.style).toMatchObject({
      paddingHorizontal: rs(10),
    });
  });
});
