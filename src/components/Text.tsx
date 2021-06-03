import React from 'react';
import {TextProps} from '../core/types';
import {
  StyleProp,
  Text as NativeText,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useTheme} from '../hooks';

const defaultProps: TextProps = {
  alignX: 'auto',
};

const Text: React.FC<TextProps> = ({
  children,
  lineHeight,
  alignX,
  style,
  color,
  font,
  size,
  onPress,
  ...rest
}) => {
  const {colors} = useTheme();

  const textStyles: StyleProp<TextStyle> = {
    fontFamily: font,
    fontSize: responsiveFontSize(size || 1.5),
    color: color ? color : colors?.text,
    textAlign: alignX,
    lineHeight: lineHeight,
  };

  return onPress ? (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <NativeText style={[textStyles, style]} {...rest}>
        {children}
      </NativeText>
    </TouchableOpacity>
  ) : (
    <NativeText style={[textStyles, style]} {...rest}>
      {children}
    </NativeText>
  );
};

Text.defaultProps = defaultProps;

export default Text;
