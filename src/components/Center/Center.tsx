import React from 'react';
import {Wrapper} from '../Wrapper';
import {WrapperProps} from '../../core';

const Center: React.FC<WrapperProps> = ({children, style, ...rest}) => {
  return (
    <Wrapper
      flex
      style={style}
      alignX="center"
      alignSelf="center"
      testID="FAST_BASE_CENTER"
      {...rest}>
      {children}
    </Wrapper>
  );
};

export default Center;
