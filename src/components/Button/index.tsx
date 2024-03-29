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
import {colorSelector, makeLayoutStyle, makeTextStyle} from '../../utils';
import {useRM} from 'react-native-full-responsive';
import {
  ButtonProps,
  DefaultSizes,
  PrimaryColors,
  PropsWithLayout,
} from '../../core';
import {
  PRESS_IN_CONFIG,
  useAnimation,
  useOpacity,
  useStyle,
  useTheme,
} from '../../hooks';
import InjectLayout from '../InjectLayout';

const DEFAULT_OPACITY_VALUE = PRESS_IN_CONFIG.toValue;

const Button = React.forwardRef<any, Partial<PropsWithLayout<ButtonProps>>>(
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
      mode = 'solid',
      dir: direction,
      pressableConfig,
      disabledTitleStyle,
      disabledTitleColor,
      disabledButtonColor,
      radius = typeof children === 'string' || !!title ? 'xs' : 0,
      size = typeof children === 'string' || !!title ? 'md' : undefined,
      type = typeof children === 'string' || !!title ? 'primary' : undefined,
      onPress,
      onPressIn,
      onLongPress,
      ...rest
    },
    ref,
  ) => {
    const {colors, dir} = useTheme();

    const {rs} = useRM();

    const {value, onFadeIn, onFadeOut} = useAnimation(pressableConfig);

    const {opacityValue, onOpacityIn, onOpacityOut} = useOpacity({
      pressIn: {
        toValue: typeof opacity === 'boolean' ? DEFAULT_OPACITY_VALUE : opacity,
        ...opacityConfig?.pressIn,
      },
    });

    const hasTitle = React.useMemo(() => {
      return typeof children === 'string' || !!title;
    }, [children, title]);

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
      if (hasTitle) {
        appliedStyles = {
          ...appliedStyles,
          alignItems: 'center',
        };
      }
      return {
        ...appliedStyles,
        overflow: 'hidden',
        borderRadius: rs(
          typeof radius === 'number' ? radius : DefaultSizes[radius] / 2,
        ),
      };
    }, [
      disabled,
      disabledButtonColor,
      colors?.disabled,
      color,
      type,
      mode,
      shadow,
      size,
      hasTitle,
      rs,
      borderColor,
      radius,
    ]);

    const memorizedTitleStyle = useStyle<TextStyle>(() => {
      return {
        color: textColor,
        fontSize: rs(DefaultSizes[size] + 4),
      };
    }, [rs, size, textColor]);

    const buttonLayoutStyle = useStyle(() => {
      return makeLayoutStyle(
        [memorizedButtonStyle, style as ViewStyle],
        direction ?? dir,
      );
    }, [dir, direction, memorizedButtonStyle, style]);

    const textLayoutStyle = useStyle(() => {
      return makeTextStyle(
        [memorizedTitleStyle, titleStyle, disabled && disabledTitleStyle],
        direction ?? dir,
      );
    }, [
      dir,
      direction,
      disabled,
      disabledTitleStyle,
      memorizedTitleStyle,
      titleStyle,
    ]);

    const loadingLayoutStyle = useStyle(() => {
      return !loadingProps?.style
        ? undefined
        : makeLayoutStyle(loadingProps.style, direction ?? dir);
    }, [dir, direction, loadingProps?.style]);

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
          role="button"
          disabled={disabled}
          onPressOut={onPressOut}
          onPress={onButtonPress}
          testID="FAST_BASE_BUTTON"
          accessibilityRole="button"
          onPressIn={onButtonPressIn}
          onLongPress={onLongButtonPress}
          aria-busy={accessibilityState.busy}
          accessibilityState={accessibilityState}
          style={buttonLayoutStyle}
          {...rest}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={indicatorColor}
              testID="FAST_BASE_BUTTON_LOADER"
              {...loadingProps}
              style={loadingLayoutStyle}
            />
          ) : hasTitle ? (
            <Text
              testID="FAST_BASE_BUTTON_TITLE"
              style={textLayoutStyle}
              {...titleProps}>
              {children || title}
            </Text>
          ) : (
            <InjectLayout dir={direction}>{children}</InjectLayout>
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
