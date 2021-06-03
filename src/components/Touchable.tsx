import React from 'react';
import {TouchableProps} from '../core/types';
import {useTheme} from '../hooks';
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from 'react-native';

const Touchable: React.FC<TouchableProps> = ({
  underlayColor,
  hasBackground,
  rippleColor,
  borderLess,
  children,
  disabled,
  onPress,
  ...rest
}) => {
  const {colors} = useTheme();
  const supported = Platform.OS === 'android' && Platform.Version > 21;
  const touchableDisabled = disabled || !onPress;
  const touchableRipple = rippleColor || colors?.flat || 'dimgray';
  const touchableUnderlayColor = underlayColor
    ? underlayColor
    : colors?.surface;

  return supported ? (
    <TouchableNativeFeedback
      {...rest}
      background={
        (hasBackground &&
          TouchableNativeFeedback.Ripple(
            touchableRipple,
            borderLess || false,
          )) ||
        undefined
      }
      disabled={touchableDisabled}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableHighlight
      {...rest}
      underlayColor={touchableUnderlayColor}
      disabled={touchableDisabled}>
      {children}
    </TouchableHighlight>
  );
};

export default Touchable;
