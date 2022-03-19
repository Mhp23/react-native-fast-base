import React from 'react';
import {Wrapper} from '../Wrapper';
import {WrapperProps} from '../../core';
import {StyleProp, ViewStyle} from 'react-native';

const Center: React.FC<WrapperProps> = ({children, style, ...rest}) => {
  const leftStyles: StyleProp<ViewStyle> = {
    alignSelf: 'center',
  };

  return (
    <Wrapper style={[leftStyles, style]} alignX="center" flex {...rest}>
      {children}
    </Wrapper>
  );
};

export default Center;
