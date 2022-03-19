import React from 'react';
import {Wrapper} from '../Wrapper';
import {IconProps} from '../../core';
import {useTheme} from '../../hooks';
import iconSelector from './iconSelector';
import {TouchableOpacity} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const defaultProps: IconProps = {
  name: '',
  size: 2.5,
  activeOpacity: 0.6,
  disabledColor: 'rgb(220,220,220)',
  type: 'MaterMaterialCommunityIcons',
};

const Icon: React.FC<IconProps> = ({
  type,
  name,
  size,
  color,
  style,
  disabled,
  buttonStyle,
  wrapperStyle,
  activeOpacity,
  disabledColor,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  ...rest
}) => {
  const {colors} = useTheme();

  const iconColor = disabled ? disabledColor : color || colors?.text;

  const isButton = onPress || onPressIn || onPressOut || onLongPress;

  const IconComponent = iconSelector(type);

  const IconWrapperComponent = isButton ? TouchableOpacity : React.Fragment;

  return (
    <Wrapper style={wrapperStyle} testID="FAST_BASE_ICON_WRAPPER" {...rest}>
      <IconWrapperComponent
        {...(isButton && {
          disabled,
          onPress,
          onPressIn,
          onPressOut,
          onLongPress,
          activeOpacity,
          style: buttonStyle,
          accessibilityRole: 'button',
          testID: 'FAST_BASE_ICON_BUTTON',
        })}>
        <IconComponent
          name={name}
          style={style}
          color={iconColor}
          testID="FAST_BASE_ICON"
          size={responsiveFontSize(size)}
        />
      </IconWrapperComponent>
    </Wrapper>
  );
};

Icon.defaultProps = defaultProps;

export default Icon;
