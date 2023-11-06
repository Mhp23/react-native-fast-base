import React from 'react';
import type {ViewStyle} from 'react-native';
import type {DividerProps, PropsWithLayout} from '../../core';
import {View} from 'react-native';
import {useTheme, useStyle} from '../../hooks';
import {useRM} from 'react-native-full-responsive';
import {colorSelector, makeLayoutStyle, makeStyle} from '../../utils';

const defaultProps: DividerProps = {
  width: 1,
  mode: 'border',
  direction: 'vertical',
};

const Divider = React.forwardRef<View, PropsWithLayout<DividerProps>>(
  ({mode, color, style, width, direction, dir: ldir, ...rest}, ref) => {
    const {colors, dir} = useTheme();

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

    const dividerLayoutStyle = useStyle(() => {
      return makeLayoutStyle([dividerStyles, style], ldir ?? dir);
    }, [dir, dividerStyles, ldir, style]);

    return (
      <View
        ref={ref}
        testID="FAST_BASE_DIVIDER"
        style={dividerLayoutStyle}
        {...rest}
      />
    );
  },
);

Divider.defaultProps = defaultProps;

export default React.memo(Divider);
