import React from 'react';
import {WrapperProps} from '../../core';
import {StyleProp, View, ViewStyle} from 'react-native';

const defaultProps: WrapperProps = {
  mode: 'normal',
  flex: false,
};

const Wrapper: React.FC<WrapperProps> = ({
  flex,
  mode,
  style,
  alignX,
  alignY,
  spaceX,
  spaceY,
  children,
  spaceTop,
  spaceEnd,
  alignSelf,
  spaceStart,
  spaceBottom,
  ...rest
}) => {
  const wrapperFlex = typeof flex === 'boolean' && flex ? 1 : flex || undefined;

  const wrapperStyles: StyleProp<ViewStyle> = {
    alignSelf,
    flex: wrapperFlex,
    justifyContent: alignY,
    alignItems: alignX,
    paddingVertical: spaceY,
    paddingTop: spaceTop,
    paddingBottom: spaceBottom,
    paddingHorizontal: spaceX,
    paddingEnd: spaceEnd,
    paddingStart: spaceStart,
    ...(mode !== 'normal' && {
      flexDirection: mode,
      flexWrap: 'wrap',
    }),
  };
  return (
    <View testID="FAST_BASE_WRAPPER" style={[wrapperStyles, style]} {...rest}>
      {children}
    </View>
  );
};

Wrapper.defaultProps = defaultProps;

export default Wrapper;
