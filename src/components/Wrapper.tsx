import React from 'react';

import {StyleProp, View, ViewStyle} from 'react-native';
import {WrapperProps} from '../core/types';

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
  children,
  spaceX,
  spaceY,
  spaceEnd,
  spaceStart,
  spaceTop,
  spaceBottom,
  ...rest
}) => {
  const wrapperStyles: StyleProp<ViewStyle> = {
    justifyContent: alignY,
    alignItems: alignX,
    ...(spaceY
      ? {paddingVertical: spaceY}
      : {
          paddingTop: spaceTop,
          paddingBottom: spaceBottom,
        }),
    ...(spaceX
      ? {paddingHorizontal: spaceX}
      : {
          paddingEnd: spaceEnd,
          paddingStart: spaceStart,
        }),
    ...(flex && {flex: 1}),
    ...(mode !== 'normal' && {
      flexDirection: mode,
      flexWrap: 'wrap',
    }),
  };

  return (
    <View style={[wrapperStyles, style]} {...rest}>
      {children}
    </View>
  );
};

Wrapper.defaultProps = defaultProps;

export default Wrapper;
