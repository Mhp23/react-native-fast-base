import React from 'react';
import Wrapper from '..';
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

  it('should be flex equal to 1 when the flex property is true', () => {
    const rendered = render(<Wrapper flex />);
    const wrppaerComponent = rendered.getByTestId(WrppaerID);
    expect(wrppaerComponent.props.style).toMatchObject({flex: 1});
  });

  it('should be flex equal to the passed number', () => {
    let flex = 3;
    const rendered = render(<Wrapper flex={flex} />);
    const wrppaerComponent = rendered.getByTestId(WrppaerID);
    expect(wrppaerComponent.props.style).toMatchObject({flex});
  });

  it('should render row direction mode correctly', () => {
    const rendered = render(
      <Wrapper mode="row">
        <TouchableOpacity testID="FIRST_TOUCHABLE_BUTTON" onPress={() => {}} />
        <TouchableOpacity testID="SECOND_TOUCHABLE_BUTTON" onPress={() => {}} />
      </Wrapper>,
    );
    const wrppaerComponent = rendered.getByTestId(WrppaerID);
    expect(wrppaerComponent.props.style).toMatchObject({flexDirection: 'row'});
    expect(wrppaerComponent.children).not.toBe(undefined);
  });

  it('should render the spaces properties correctly', () => {
    const rendered = render(
      <Wrapper
        spaceX={1}
        spaceY={1}
        spaceEnd={1}
        spaceTop={1}
        spaceStart={0.5}
        spaceBottom={0.5}
      />,
    ).toJSON();

    const keys = [
      'paddingHorizontal',
      'paddingVertical',
      'paddingEnd',
      'paddingStart',
      'paddingTop',
      'paddingBottom',
    ];
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
    keys.forEach(styleKey => {
      expect(rendered.props.style).toHaveProperty(styleKey);
    });
  });
});
