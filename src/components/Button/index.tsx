import React from 'react';
import {
  Animated,
  Platform,
  ViewStyle,
  TextStyle,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import Text from '../Text';
import {colorSelector} from '../../utils';
import {useRM} from 'react-native-full-responsive';
import {ButtonProps, DefaultSizes, PrimaryColors} from '../../core';
import {
  PRESS_IN_CONFIG,
  useAnimation,
  useOpacity,
  useStyle,
  useTheme,
} from '../../hooks';

const DEFAULT_OPACITY_VALUE = PRESS_IN_CONFIG.toValue;

const Button = React.forwardRef<any, Partial<ButtonProps>>(
  (
    {
      style,
      title,
      color,
      shadow,
      opacity,
      loading,
      disabled,
      children,
      pressable,
      titleProps,
      titleColor,
      titleStyle,
      borderColor,
      loadingProps,
      loadingColor,
      opacityConfig,
      radius = 'xs',
      mode = 'solid',
      pressableConfig,
      disabledTitleStyle,
      disabledTitleColor,
      disabledButtonColor,
      size = typeof children === 'string' || !!title ? 'md' : undefined,
      type = typeof children === 'string' || !!title ? 'primary' : undefined,
      onPress,
      onPressIn,
      onLongPress,
      ...rest
    },
    ref,
  ) => {
    const {colors} = useTheme();

    const {rs} = useRM();

    const {value, onFadeIn, onFadeOut} = useAnimation(pressableConfig);

    const {opacityValue, onOpacityIn, onOpacityOut} = useOpacity({
      pressIn: {
        toValue: typeof opacity === 'boolean' ? DEFAULT_OPACITY_VALUE : opacity,
        ...opacityConfig?.pressIn,
      },
    });

    const textColor = React.useMemo(() => {
      const selectedColor = disabled
        ? disabledTitleColor ?? colors?.secondText
        : mode === 'solid'
        ? colorSelector(titleColor) ?? '#ffffff'
        : colorSelector(titleColor || color) ?? PrimaryColors[type];
      return selectedColor as string;
    }, [
      mode,
      type,
      color,
      disabled,
      titleColor,
      disabledTitleColor,
      colors?.secondText,
    ]);

    const indicatorColor = React.useMemo(() => {
      return colorSelector(loadingColor) || textColor;
    }, [loadingColor, textColor]);

    const memorizedButtonStyle = useStyle<ViewStyle>(() => {
      let appliedStyles: ViewStyle = {};

      const mainColor = (
        disabled
          ? disabledButtonColor || colors?.disabled
          : colorSelector(color) || PrimaryColors[type]
      ) as string;

      if (mode === 'solid') {
        appliedStyles = {backgroundColor: mainColor};
      } else if (mode === 'outline') {
        appliedStyles = {
          borderWidth: rs(1.25),
          borderColor: colorSelector(borderColor) || mainColor,
        };
      } else {
        appliedStyles = {backgroundColor: 'transparent'};
      }
      if (mode === 'solid' && shadow && color !== 'transparent') {
        appliedStyles = {
          ...appliedStyles,
          ...(shadow === true || shadow === 'low'
            ? styles.lowShadow
            : shadow === 'medium'
            ? styles.midShadow
            : styles.highShadow),
        };
      }
      if (size in DefaultSizes) {
        appliedStyles = {
          ...appliedStyles,
          paddingVertical: rs(DefaultSizes[size]) * 0.8,
          paddingHorizontal: rs(DefaultSizes[size]) * 1.2,
        };
      }
      return {
        ...appliedStyles,
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: rs(
          typeof radius === 'number' ? radius : DefaultSizes[radius] / 2,
        ),
      };
    }, [
      rs,
      size,
      type,
      mode,
      color,
      radius,
      shadow,
      disabled,
      borderColor,
      disabledButtonColor,
      colors?.disabled,
    ]);

    const memorizedTitleStyle = useStyle<TextStyle>(() => {
      return {
        color: textColor,
        fontSize: rs(DefaultSizes[size] + 4),
      };
    }, [rs, size, textColor]);

    const accessibilityState = React.useMemo(() => {
      return {disabled: !!disabled, busy: !!loading};
    }, [disabled, loading]);

    const onButtonPress = React.useCallback(
      (event: GestureResponderEvent) => {
        if (!loading && !disabled) {
          onPress?.(event);
        }
      },
      [disabled, loading, onPress],
    );
    const onButtonPressIn = React.useCallback(
      (event: GestureResponderEvent) => {
        if (!loading && !disabled) {
          if (pressable) {
            onFadeIn();
          }
          if (opacity) {
            onOpacityIn();
          }
          onPressIn?.(event);
        }
      },
      [disabled, loading, onFadeIn, onOpacityIn, onPressIn, opacity, pressable],
    );
    const onLongButtonPress = React.useCallback(
      (event: GestureResponderEvent) => {
        if (!loading && !disabled) {
          onLongPress?.(event);
        }
      },
      [disabled, loading, onLongPress],
    );

    const onPressOut = React.useCallback(() => {
      if (pressable) {
        onFadeOut();
      }
      if (opacity) {
        onOpacityOut();
      }
    }, [onFadeOut, onOpacityOut, opacity, pressable]);

    const ContentWrapperView = React.useMemo(() => {
      return pressable || opacity ? Animated.View : React.Fragment;
    }, [opacity, pressable]);

    return (
      <ContentWrapperView
        {...((pressable || opacity) && {
          style: {
            opacity: opacityValue,
            transform: [{scale: value}],
          },
        })}>
        <Pressable
          ref={ref}
          disabled={disabled}
          onPressOut={onPressOut}
          onPress={onButtonPress}
          testID="FAST_BASE_BUTTON"
          accessibilityRole="button"
          onPressIn={onButtonPressIn}
          onLongPress={onLongButtonPress}
          accessibilityState={accessibilityState}
          style={StyleSheet.flatten([memorizedButtonStyle, style])}
          {...rest}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={indicatorColor}
              testID="FAST_BASE_BUTTON_LOADER"
              {...loadingProps}
            />
          ) : typeof children === 'string' || !!title ? (
            <Text
              testID="FAST_BASE_BUTTON_TITLE"
              style={StyleSheet.flatten([
                memorizedTitleStyle,
                titleStyle,
                disabled && disabledTitleStyle,
              ])}
              {...titleProps}>
              {children || title}
            </Text>
          ) : (
            children
          )}
        </Pressable>
      </ContentWrapperView>
    );
  },
);

export default Button;

const styles = StyleSheet.create({
  lowShadow: {
    ...Platform.select({
      default: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  midShadow: {
    ...Platform.select({
      default: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  highShadow: {
    ...Platform.select({
      default: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
