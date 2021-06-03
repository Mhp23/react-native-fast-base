import React from 'react';
import Wrapper from './Wrapper';

import {StyleProp, ViewStyle, Platform, Dimensions} from 'react-native';
import {WrapperProps} from '../core/types';
import {useTheme} from '../hooks';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const Container: React.FC<WrapperProps> = ({children, style}) => {
  const {colors} = useTheme();

  const containerStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors?.background,
    height: Platform.select({
      android: DEVICE_HEIGHT,
      ios: DEVICE_HEIGHT - 20,
    }),
  };

  return (
    <Wrapper style={[containerStyles, style]} flex>
      {children}
    </Wrapper>
  );
};

export default Container;
