import React from 'react';
import {useStyle, useTheme} from '../../hooks';
import {useRM} from 'react-native-full-responsive';
import {Text as NativeText, type TextStyle} from 'react-native';
import {colorSelector, makeStyle, makeTextStyle} from '../../utils';
import {DefaultTextSizes, PropsWithLayout, type TextProps} from '../../core';

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
      dir: direction,
      ...rest
    }: PropsWithLayout<TextProps<T>>,
    ref?: React.Ref<NativeText>,
  ) => {
    const {colors, dir} = useTheme();

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

    const textLayoutStyle = useStyle<TextStyle>(() => {
      return makeTextStyle([textStyles, style], direction ?? dir);
    }, [dir, direction, style, textStyles]);

    return (
      <NativeText
        ref={ref}
        testID="FAST_BASE_TEXT"
        style={textLayoutStyle}
        {...rest}>
        {children}
      </NativeText>
    );
  },
);

Text.defaultProps = defaultProps;

export default Text as <T extends string = ''>(
  props: PropsWithLayout<TextProps<T>> & {ref?: React.Ref<NativeText>},
) => React.ReactElement;
