import React from 'react';
import {Wrapper} from '..';
import {makeStyle} from '../../utils';
import {StyleSheet} from 'react-native';
import type {ViewStyle} from 'react-native';
import type {DividerProps} from '../../core';
import {useTheme, useStyle} from '../../hooks';
import {useRM} from 'react-native-full-responsive';

const defaultProps: DividerProps = {
  width: 1,
  spaceX: 0,
  spaceY: 0,
  spaceTop: 0,
  mode: 'border',
  spaceBottom: 0,
  direction: 'vertical',
};

const Divider: React.FC<DividerProps> = ({
  mode,
  color,
  style,
  width,
  spaceY,
  spaceX,
  spaceTop,
  direction,
  spaceBottom,
}) => {
  const {colors} = useTheme();

  const {rs} = useRM();

  const dividerStyles = useStyle<ViewStyle>(() => {
    return makeStyle<ViewStyle>({
      marginVertical: rs(spaceY),
      marginHorizontal: rs(spaceX),
      marginTop: rs(spaceTop),
      marginBottom: rs(spaceBottom),
      ...(mode === 'border' && {
        borderColor: color || colors?.flat,
        ...(direction === 'horizontal'
          ? {
              borderStartWidth: rs(width),
            }
          : {
              borderBottomWidth: rs(width),
            }),
      }),
    });
  }, [
    rs,
    mode,
    width,
    color,
    spaceY,
    spaceX,
    spaceTop,
    direction,
    spaceBottom,
    colors?.flat,
  ]);

  return (
    <Wrapper
      testID="FAST_BASE_DIVIDER"
      style={StyleSheet.flatten([dividerStyles, style])}
    />
  );
};

Divider.defaultProps = defaultProps;

export default Divider;
