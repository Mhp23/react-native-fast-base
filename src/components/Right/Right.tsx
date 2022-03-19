import React from 'react';
import {Wrapper} from '../Wrapper';
import {WrapperProps} from '../../core';

const Right: React.FC<WrapperProps> = ({children, style, ...rest}) => {
  return (
    <Wrapper
      flex
      style={style}
      alignX="flex-end"
      alignSelf="center"
      testID="FAST_BASE_RIGHT"
      {...rest}>
      {children}
    </Wrapper>
  );
};

export default Right;
