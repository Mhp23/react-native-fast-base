import React from 'react';
import {Wrapper} from '../Wrapper';
import {useTheme} from '../../hooks';
import {DividerProps} from '../../core';
import {StyleSheet} from 'react-native';

const defaultProps: DividerProps = {
  width: 0.5,
  mode: 'border',
};

const Divider: React.FC<DividerProps> = ({
  mode,
  color,
  style,
  width,
  spaceY,
  spaceX,
  spaceTop,
  spaceBottom,
}) => {
  const {colors} = useTheme();

  return (
    <Wrapper
      testID="FAST_BASE_DIVIDER"
      style={StyleSheet.flatten([
        {
          marginVertical: spaceY,
          marginHorizontal: spaceX,
          marginTop: spaceTop,
          marginBottom: spaceBottom,
        },
        mode === 'border' && {
          borderWidth: width,
          borderColor: color || colors?.secondText,
        },
        style,
      ])}
    />
  );
};

Divider.defaultProps = defaultProps;

export default Divider;
