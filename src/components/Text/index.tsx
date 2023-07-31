import React from 'react';
import {useStyle, useTheme} from '../../hooks';
import {useRM} from 'react-native-full-responsive';
import {colorSelector, makeStyle} from '../../utils';
import {DefaultTextSizes, type TextProps} from '../../core';
import {StyleSheet, Text as NativeText, type TextStyle} from 'react-native';

const defaultProps: TextProps = {
  size: 'md',
};
/**
 * in typescript, the Text component allows you to use custom fonts that
 * you added to your project, only need to wrap your type inside it like
 * the below example:
 * ```
 * <Text<'MyFont1' | 'MyFont2'> {...props}>
 *  Awesome Text!
 * </Text>
 * ```
 */
const Text = React.forwardRef(
  <T extends string = ''>(
    {
      ax,
      font,
      size,
      color,
      style,
      weight,
      height,
      children,
      ...rest
    }: TextProps<T>,
    ref?: React.Ref<NativeText>,
  ) => {
    const {colors} = useTheme();

    const {rs} = useRM();

    const textStyles = useStyle<TextStyle>(() => {
      const textColor = colorSelector(color) || colors?.text;
      const fontSize = rs(
        typeof size === 'number' ? size : DefaultTextSizes[size],
      );
      return makeStyle({
        fontSize,
        textAlign: ax,
        fontFamily: font,
        color: textColor,
        fontWeight: weight,
        lineHeight: height,
      });
    }, [color, colors?.text, rs, size, font, ax, weight, height]);

    return (
      <NativeText
        ref={ref}
        testID="FAST_BASE_TEXT"
        style={StyleSheet.flatten([textStyles, style])}
        {...rest}>
        {children}
      </NativeText>
    );
  },
);

Text.defaultProps = defaultProps;

export default Text as <T extends string = ''>(
  props: TextProps<T> & {ref?: React.Ref<NativeText>},
) => React.ReactElement;
