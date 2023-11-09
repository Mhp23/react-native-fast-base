import {DirectionType} from '../../../core';
import {
  FlexAlignType,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

const changeFlex = (flex: FlexAlignType): FlexAlignType => {
  return flex === 'flex-start'
    ? 'flex-end'
    : flex === 'flex-end'
    ? 'flex-start'
    : flex;
};

const makeLayoutStyle = (
  styles: StyleProp<ViewStyle>,
  direction: DirectionType = 'ltr',
) => {
  if (direction !== 'rtl' && direction !== 'ltr') {
    throw new Error(
      'The passed layout direction should be either "ltr" or "rtl"',
    );
  }
  const flattenedStyles = StyleSheet.flatten(styles);

  if (direction === 'ltr') {
    return flattenedStyles;
  }
  const changedStyle: StyleProp<ViewStyle> = {};

  const keys = Object.keys(flattenedStyles);
  const values = Object.values(flattenedStyles);
  //flex direction index in the styles
  const FDIndex = keys.findIndex(key => key === 'flexDirection');
  const isFlexRow = FDIndex > -1 && values[FDIndex]?.includes('row');

  const keyTransformations = new Map([
    ['Start', 'End'],
    ['End', 'Start'],
    ['Right', 'Left'],
    ['Left', 'Right'],
  ]);
  /**
   * the order of conditions is based on their usage to try to improve the algorithm's time complexity.
   */
  for (let i = 0; i < keys.length; ++i) {
    let key = keys[i];
    let value = values[i];

    let shouldToCheck = true;

    for (const [from, to] of keyTransformations) {
      if (key.includes(from)) {
        key = key.replace(from, to);
        shouldToCheck = false;
        break;
      }
    }
    if (shouldToCheck) {
      if (key === 'alignItems' && !isFlexRow) {
        value = changeFlex(value);
      } else if (key === 'justifyContent' && isFlexRow) {
        value = changeFlex(value);
      } else if (['alignSelf', 'alignContent'].includes(key)) {
        value = changeFlex(value);
      } else if (key === 'left') {
        key = 'right';
      } else if (key === 'right') {
        key = 'left';
      }
    }
    if (value === undefined || value === null) {
      Object.assign(changedStyle, {[key]: value});
      continue;
    } else if (value === 'row-reverse') {
      value = 'row';
    } else if (value === 'row') {
      value = 'row-reverse';
    }
    Object.assign(changedStyle, {[key]: value});
  }
  return changedStyle;
};

const makeTextStyle = (
  styles: StyleProp<TextStyle>,
  direction: DirectionType = 'ltr',
) => {
  if (direction !== 'rtl' && direction !== 'ltr') {
    throw new Error(
      'The passed layout direction should be either "ltr" or "rtl"',
    );
  }
  let flattenedStyles = StyleSheet.flatten(styles);

  if (direction === 'ltr') {
    return flattenedStyles;
  }
  flattenedStyles = makeLayoutStyle(flattenedStyles, direction);

  const changedStyle: StyleProp<ViewStyle> = {};

  Object.entries(flattenedStyles).forEach(style => {
    let key = style[0];
    let value = style[1];

    if (key === 'textAlign') {
      if (value === undefined || value === null) {
        Object.assign(changedStyle, {[key]: value});
        return;
      } else {
        if (value === 'left') {
          value = 'right';
        } else if (value === 'right') {
          value = 'left';
        }
      }
    }
    Object.assign(changedStyle, {[key]: value});
  });

  return changedStyle;
};

export {changeFlex, makeTextStyle, makeLayoutStyle};
