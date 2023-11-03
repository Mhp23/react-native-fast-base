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
  const flatedStyles = StyleSheet.flatten(styles);

  if (direction === 'ltr') {
    return flatedStyles;
  }
  const changedStyle: StyleProp<ViewStyle> = {};

  Object.entries(flatedStyles).forEach(style => {
    let key = style[0];
    let value = style[1];
    /**
     * converting required key to RTL
     */
    if (key.includes('Start')) {
      key = key.replace('Start', 'End');
    } else if (key.includes('End')) {
      key = key.replace('End', 'Start');
    } else if (key.includes('Right')) {
      key = key.replace('Right', 'Left');
    } else if (key.includes('Left')) {
      key = key.replace('Left', 'Right');
    } else if (key === 'alignItems') {
      value = changeFlex(value);
    } else if (key === 'justifyContent') {
      value = changeFlex(value);
    } else if (key === 'alignSelf') {
      value = changeFlex(value);
    } else if (key === 'alignContent') {
      value = changeFlex(value);
    } else if (key === 'left') {
      key = 'right';
    } else if (key === 'right') {
      key = 'left';
    }

    if (value === undefined || value === null) {
      Object.assign(changedStyle, {[key]: value});
      return;
    } else {
      /**
       * converting required values to RTL
       */
      if (value === 'row-reverse') {
        value = 'row';
      } else if (value === 'row') {
        value = 'row-reverse';
      }
    }
    Object.assign(changedStyle, {[key]: value});
  });

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
  let flatedStyles = StyleSheet.flatten(styles);

  if (direction === 'ltr') {
    return flatedStyles;
  }

  flatedStyles = makeLayoutStyle(flatedStyles, direction);

  const changedStyle: StyleProp<ViewStyle> = {};

  Object.entries(flatedStyles).forEach(style => {
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
