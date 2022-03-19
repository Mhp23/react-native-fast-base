import React from 'react';
import {useTheme} from '../../hooks';
import {TouchableProps} from '../../core';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const defaultProps: TouchableProps = {
  radius: 5,
  disabledColor: 'rgb(220,220,220)',
};

const Touchable: React.FC<TouchableProps> = ({
  style,
  radius,
  loading,
  disabled,
  children,
  hasBorder,
  hasShadow,
  borderColor,
  loadingColor,
  loadingProps,
  disabledColor,
  ...rest
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled}
      testID="FAST_BASE_BUTTON"
      accessibilityRole="button"
      style={StyleSheet.flatten([
        styles.button,
        hasShadow && styles.shadow,
        hasBorder && [
          styles.border,
          {
            borderColor: borderColor || colors?.secondText,
          },
        ],
        {
          borderRadius: radius,
        },
        disabled && {
          backgroundColor: disabledColor,
        },
        style,
      ])}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          size="small"
          testID="BUTTON_LOADER"
          color={loadingColor || colors?.secondText}
          {...loadingProps}
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

Touchable.defaultProps = defaultProps;

export default Touchable;

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  border: {
    borderWidth: 1,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
    }),
  },
});
