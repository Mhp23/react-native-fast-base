import React from 'react';
import Wrapper from './Wrapper';
import Text from './Text';
import {SpacerProps} from '../core/types';
import {useTheme} from '../hooks';

const defaultProps: SpacerProps = {
  spaceX: 5,
  spaceY: 0,
  mode: 'space',
  customSymbol: '.',
};

const Spacer: React.FC<SpacerProps> = ({
  mode,
  size,
  color,
  spaceX,
  spaceY,
  customSymbol,
}) => {
  const {colors} = useTheme();

  return mode === 'space' ? (
    <Wrapper spaceX={spaceX} spaceY={spaceY} />
  ) : (
    <Wrapper alignY="center" spaceX={spaceX} spaceY={spaceY}>
      <Text color={color || colors?.secondText} size={size}>
        {customSymbol}
      </Text>
    </Wrapper>
  );
};

Spacer.defaultProps = defaultProps;

export default Spacer;
