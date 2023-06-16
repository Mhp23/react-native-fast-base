import React from 'react';
import {colorSelector, makeStyle} from '../../utils';
import type {TextProps} from '../../core';
import {useStyle, useTheme} from '../../hooks';
import {useRS} from 'react-native-full-responsive';
import {StyleSheet, Text as NativeText, type TextStyle} from 'react-native';

const defaultProps: TextProps = {
  size: 14,
};
/**
 * in typescript, the Text component allows you to use the custom fonts
 * that you added to your project, only need to wrap your type inside it
 * like the below example:
 * ```
 * <Text<'MyFont1' | 'MyFont2'> {...props}>
 *  Awesome Text!
 * </Text>
 * ```
 */
const Text = React.forwardRef(
  <T extends string = ''>(
    {size, color, style, font, alignX, children, ...rest}: TextProps<T>,
    ref?: React.Ref<NativeText>,
  ) => {
    const {colors} = useTheme();

    const fontSize = useRS(size);

    const textStyles = useStyle<TextStyle>(() => {
      const textColor = colorSelector(color) || colors?.text;
      return makeStyle({
        fontSize,
        color: textColor,
        fontFamily: font,
        textAlign: alignX,
      });
    }, [alignX, color, font, colors?.text, fontSize]);

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
