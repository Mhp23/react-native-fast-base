import type {StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {StyleSheet} from 'react-native';

export const makeStyle = <T extends ViewStyle | TextStyle | ImageStyle>(
  styles: StyleProp<T>,
  /**
   * as default items of a style if be zero, it's be removed from styles
   */
  acceptZeroValues: boolean = false,
) => {
  const flatedStyles = StyleSheet.flatten(styles);

  if (!Object.keys(flatedStyles).length) {
    return flatedStyles;
  }
  const cleanedStyles: StyleProp<ViewStyle> = {};

  Object.entries(flatedStyles).forEach(style => {
    const key = style[0];
    const value = style[1];

    if (value !== undefined && value !== null) {
      if (value === 0 && !acceptZeroValues) {
        return;
      }
      Object.assign(cleanedStyles, {[key]: value});
    }
  });
  return cleanedStyles;
};
