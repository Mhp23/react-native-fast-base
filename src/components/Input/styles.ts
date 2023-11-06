import {colorSelector, makeTextStyle} from '../../utils';
import {useStyle, useTheme} from '../../hooks';
import {useRM} from 'react-native-full-responsive';
import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  InputProps,
  DefaultSizes,
  PrimaryColors,
  InputSpaceSizes,
  SizeType,
  DirectionType,
} from '../../core';
import {useMemo} from 'react';

const FULL_ROUND = 150;

const BORDER_WDITH = 1.5;

type UseStyleType = InputProps & {
  focused?: boolean;
  /**
   * border radius around of the text input
   * @default xs
   */
  radius?: SizeType | 'full' | number;
};
/**
 *
 * @param param0
 * @returns
 */
export const useBorder = ({
  focused,
  invalid,
  borderWidth,
  invalidStyle,
  focusedBorderColor,
  unFocusedBorderColor,
}: Pick<
  UseStyleType,
  | 'focused'
  | 'invalid'
  | 'borderWidth'
  | 'invalidStyle'
  | 'focusedBorderColor'
  | 'unFocusedBorderColor'
>) => {
  const {rs} = useRM();

  const {colors} = useTheme();

  const width = rs(borderWidth || BORDER_WDITH);

  const invalidBorderColor =
    (invalidStyle as ViewStyle)?.borderColor ||
    (invalidStyle as ViewStyle)?.borderBottomColor ||
    colors?.error;
  /**
   * border color of the text input component based the component is focused or not
   */
  const unFocusedColor = invalid
    ? invalidBorderColor
    : colorSelector(unFocusedBorderColor) || colors?.border;

  const focusedColor =
    colorSelector(focusedBorderColor) || PrimaryColors.primary;

  const color = focused ? focusedColor : unFocusedColor;

  return {width, color, unFocusedColor, focusedColor};
};
/**
 *
 * @param param0
 * @returns
 */
export const useOutlineStyle = ({
  size,
  radius,
  focused,
  invalid,
  invalidStyle,
  hasLeftElement,
  hasRightElement,
  focusedBorderColor,
  unFocusedBorderColor,
}: UseStyleType & {
  hasLeftElement: boolean;
  hasRightElement: boolean;
}) => {
  const {rs} = useRM();

  const isInvalid = invalid && !focused;

  const {width, color} = useBorder({
    focused,
    invalid: isInvalid,
    focusedBorderColor,
    unFocusedBorderColor,
  });

  const textInputStyle = useStyle(() => {
    let appliedStyles: ViewStyle = {};

    if (size in InputSpaceSizes) {
      const padding = rs(InputSpaceSizes[size]);

      if (!hasLeftElement) {
        appliedStyles = {
          ...appliedStyles,
          paddingStart: padding,
        };
      }
      if (!hasRightElement) {
        appliedStyles = {
          ...appliedStyles,
          paddingEnd: padding,
        };
      }
    }
    return appliedStyles;
  }, [hasLeftElement, hasRightElement, rs, size]);

  const containerStyle = useStyle(() => {
    return {
      overflow: 'hidden',
      borderColor: color,
      borderWidth: width,
      borderRadius:
        typeof radius === 'number'
          ? radius
          : rs(radius === 'full' ? FULL_ROUND : DefaultSizes[radius] / 2),
    };
  }, [color, radius, rs, width]);

  return {
    containerStyle: StyleSheet.flatten([
      containerStyle,
      isInvalid && invalidStyle,
    ]),
    textInputStyle,
  };
};
/**
 *
 * @param param0
 * @returns
 */
export const useInputStyle = ({
  dir,
  size,
  disabled,
  inputStyle,
  background,
}: Pick<UseStyleType, 'size' | 'disabled' | 'background' | 'inputStyle'> & {
  dir: DirectionType;
}) => {
  const {rs} = useRM();

  const {colors} = useTheme();
  /**
   * text input (container) background color
   */
  const backgroundColor = background
    ? colorSelector(background) || colors?.surface
    : undefined;
  /**
   * text input container style
   */
  const wrapperStyle = useStyle(() => {
    return {
      backgroundColor,
      position: 'relative',
    };
  }, [backgroundColor]);

  const textInputStyle = useStyle(() => {
    let appliedStyles: TextStyle = {
      flex: 1,
      color: disabled ? colors?.disabled : colors?.text,
    };
    if (Platform.OS === 'web') {
      appliedStyles = {
        ...appliedStyles,
        //@ts-expect-error it's only works for web
        outlineStyle: 'none',
      };
    }
    if (size in DefaultSizes) {
      const padding = Platform.select({
        android: rs(InputSpaceSizes[size] * 0.5),
        default: rs(InputSpaceSizes[size] * 0.8),
      });

      appliedStyles = {
        ...appliedStyles,
        paddingTop: padding,
        paddingBottom: padding,
        fontSize: rs(DefaultSizes[size] + 1),
      };
    }
    return appliedStyles;
  }, [rs, size, disabled, colors?.text, colors?.disabled]);

  const textInputLayoutStyle = useMemo(() => {
    return makeTextStyle([textInputStyle, inputStyle], dir) as TextStyle;
  }, [inputStyle, textInputStyle, dir]);

  return {
    wrapperStyle,
    textInputStyle: textInputLayoutStyle,
  };
};
