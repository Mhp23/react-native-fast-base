import React from 'react';
import {Wrapper} from '../Wrapper';
import {useTheme} from '../../hooks';
import {DividerProps} from '../../core';
import {StyleProp, ViewStyle} from 'react-native';

const defaultProps: DividerProps = {
  width: 0.5,
  mode: 'border',
};

const Divider: React.FC<DividerProps> = ({
  style,
  width,
  mode,
  spaceY,
  spaceTop,
  spaceBottom,
}) => {
  const {colors} = useTheme();

  const dividerStyle: StyleProp<ViewStyle> = [
    mode === 'border' && {
      borderWidth: width,
      borderColor: colors?.flat,
    },
  ];

  return (
    <Wrapper
      style={[dividerStyle, style]}
      {...{
        spaceY,
        spaceBottom,
        spaceTop,
      }}
    />
  );
};

Divider.defaultProps = defaultProps;

export default Divider;
