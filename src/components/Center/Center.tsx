import React from 'react';
import {Wrapper} from '../Wrapper';
import {SpaceXYProps} from '../../core';

const Center: React.FC<SpaceXYProps> = ({children, style, ...rest}) => {
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
