import React from 'react';
import {Wrapper} from '../Wrapper';
import {WrapperProps} from '../../core';
import {StyleProp, ViewStyle} from 'react-native';

const Left: React.FC<WrapperProps> = ({children, style, ...rest}) => {
  const leftStyles: StyleProp<ViewStyle> = {
    alignSelf: 'center',
  };

  return (
    <Wrapper style={[leftStyles, style]} alignX="flex-start" flex {...rest}>
      {children}
    </Wrapper>
  );
};

export default Left;
