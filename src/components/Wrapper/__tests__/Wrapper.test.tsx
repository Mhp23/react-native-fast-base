import React from 'react';
import {Wrapper} from '..';
import {Text, TouchableOpacity} from 'react-native';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

const WrppaerID = 'FAST_BASE_WRAPPER';

describe('Wrapper component', () => {
  it('should match snapshot', () => {
    const rendered = render(<Wrapper children={<Text />} />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should be flex equal to one when be true', () => {
    const rendered = render(<Wrapper flex />);
    const wrppaerComponent = rendered.getByTestId(WrppaerID);
    expect(wrppaerComponent.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({flex: 1})]),
    );
  });

  it('should be flex equal to passed number', () => {
    let flex = 3;
    const rendered = render(<Wrapper flex={flex} />);
    const wrppaerComponent = rendered.getByTestId(WrppaerID);
    expect(wrppaerComponent.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({flex})]),
    );
  });

  it('should render row direction mode correctly', () => {
    const rendered = render(
      <Wrapper mode="row">
        <TouchableOpacity testID="FIRST_TOUCHABLE_BUTTON" onPress={() => {}} />
        <TouchableOpacity testID="SECOND_TOUCHABLE_BUTTON" onPress={() => {}} />
      </Wrapper>,
    );
    const wrppaerComponent = rendered.getByTestId(WrppaerID);
    expect(wrppaerComponent.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({flexDirection: 'row'})]),
    );
    expect(wrppaerComponent.children).not.toBe(undefined);
  });

  it('should render padding for both of numbers and percent string', () => {
    const rendered = render(
      <Wrapper
        spaceX={4}
        spaceY={8}
        spaceEnd={7}
        spaceTop={10}
        spaceStart="2%"
        spaceBottom="5%"
      />,
    ).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
