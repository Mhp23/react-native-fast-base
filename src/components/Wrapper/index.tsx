import React from 'react';
import {useStyle} from '../../hooks';
import {makeStyle} from '../../utils';
import type {WrapperProps} from '../../core';
import {StyleSheet, View, type ViewStyle} from 'react-native';
import {useRM} from 'react-native-full-responsive';

const defaultProps: WrapperProps = {
  mode: 'normal',
  flex: false,
  spaceX: 0,
  spaceY: 0,
  spaceTop: 0,
  spaceEnd: 0,
  spaceStart: 0,
  spaceBottom: 0,
};

const Wrapper = React.forwardRef<View, WrapperProps>(
  (
    {
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
    },
    ref,
  ) => {
    const {rw, rh} = useRM();

    const wrapperFlex = React.useMemo(() => {
      return typeof flex === 'number' ? flex : flex === true ? 1 : undefined;
    }, [flex]);

    const wrapperStyles = useStyle<ViewStyle>(() => {
      return makeStyle<ViewStyle>({
        alignSelf,
        flex: wrapperFlex,
        alignItems: alignX,
        justifyContent: alignY,
        paddingVertical: rh(spaceY),
        paddingTop: rh(spaceTop),
        paddingBottom: rh(spaceBottom),
        paddingHorizontal: rw(spaceX),
        paddingEnd: rw(spaceEnd),
        paddingStart: rw(spaceStart),
        ...(mode === 'normal'
          ? {}
          : {
              flexDirection: mode,
              flexWrap: 'wrap',
            }),
      });
    }, [
      rh,
      rw,
      mode,
      alignX,
      alignY,
      spaceY,
      spaceX,
      spaceTop,
      spaceEnd,
      alignSelf,
      spaceStart,
      spaceBottom,
      wrapperFlex,
    ]);

    return (
      <View
        ref={ref}
        style={StyleSheet.flatten([wrapperStyles, style])}
        testID="FAST_BASE_WRAPPER"
        {...rest}>
        {children}
      </View>
    );
  },
);

Wrapper.defaultProps = defaultProps;

export default Wrapper;
