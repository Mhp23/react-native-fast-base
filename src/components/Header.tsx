import React from 'react';
import Wrapper from './Wrapper';
import {HeaderProps} from '../core/types';
import {useTheme} from '../hooks';
import {StyleProp, ViewStyle} from 'react-native';

const defaultProps: HeaderProps = {
  height: 56,
  transparent: false,
};

const Header: React.FC<HeaderProps> = ({
  transparent,
  children,
  height,
  style,
  ...rest
}) => {
  const {colors} = useTheme();

  const headerStyles: StyleProp<ViewStyle> = {
    backgroundColor: transparent ? 'transparent' : colors?.background,
    height,
  };

  return (
    <Wrapper style={[headerStyles, style]} {...rest}>
      {children}
    </Wrapper>
  );
};

Header.defaultProps = defaultProps;

export default Header;
