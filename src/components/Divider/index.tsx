import React from 'react';
import type {ViewStyle} from 'react-native';
import type {DividerProps} from '../../core';
import {StyleSheet, View} from 'react-native';
import {useTheme, useStyle} from '../../hooks';
import {useRM} from 'react-native-full-responsive';
import {colorSelector, makeStyle} from '../../utils';

const defaultProps: DividerProps = {
  width: 1,
  mode: 'border',
  direction: 'vertical',
};

const Divider = React.forwardRef<View, DividerProps>(
  ({mode, color, style, width, direction, ...rest}, ref) => {
    const {colors} = useTheme();

    const {rs} = useRM();

    const dividerStyles = useStyle<ViewStyle>(() => {
      const borderColor = colorSelector(color) || colors?.border;
      return makeStyle<ViewStyle>({
        ...(mode === 'padding'
          ? {
              ...(direction === 'horizontal'
                ? {paddingHorizontal: rs(width)}
                : {paddingVertical: rs(width)}),
            }
          : {
              ...(direction === 'horizontal'
                ? {borderStartWidth: rs(width), borderStartColor: borderColor}
                : {
                    borderBottomWidth: rs(width),
                    borderBottomColor: borderColor,
                  }),
            }),
      });
    }, [rs, mode, width, color, direction, colors?.border]);

    return (
      <View
        ref={ref}
        testID="FAST_BASE_DIVIDER"
        style={StyleSheet.flatten([dividerStyles, style])}
        {...rest}
      />
    );
  },
);

Divider.defaultProps = defaultProps;

export default React.memo(Divider);
