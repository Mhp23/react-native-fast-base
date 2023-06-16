import type {StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {StyleSheet} from 'react-native';
/**
 * make cleanup un un-valid styles
 */
export const makeStyle = <T extends ViewStyle | TextStyle | ImageStyle>(
  styles: StyleProp<T>,
) => {
  const flatedStyles = StyleSheet.flatten(styles);

  if (!Object.keys(flatedStyles).length) {
    return flatedStyles;
  }
  const cleanedStyles: StyleProp<ViewStyle> = {};

  Object.entries(flatedStyles).forEach(style => {
    const key = style[0];
    const value = style[1];
    if (value) {
      Object.assign(cleanedStyles, {[key]: value});
    }
  });
  return cleanedStyles;
};
