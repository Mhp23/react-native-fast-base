import React from 'react';
import {Wrapper} from '../Wrapper';
import {SpaceXYProps} from '../../core';

const Left: React.FC<SpaceXYProps> = ({children, style, ...rest}) => {
  return (
    <Wrapper
      flex
      style={style}
      alignSelf="center"
      alignX="flex-start"
      testID="FAST_BASE_LEFT"
      {...rest}>
      {children}
    </Wrapper>
  );
};

export default Left;
