/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import Text from '../Text';
import Wrapper from '../Wrapper';
import {useAnimation, useStyle, useTheme} from '../../hooks';
import {
  SizeType,
  ButtonProps,
  DefaultSizes,
  DefaultThemeColorsProps,
} from '../../core';
import {useRM} from 'react-native-full-responsive';

const defaultProps: Partial<ButtonProps> = {
  size: 'md',
  radius: 'sm',
  mode: 'solid',
};

const Button = React.forwardRef<View, Partial<ButtonProps>>(
  (
    {
      mode,
      size,
      title,
      color,
      radius,
      shadow,
      loading,
      disabled,
      children,
      pressable,
      titleProps,
      titleColor,
      titleStyle,
      borderColor,
      buttonStyle,
      loadingProps,
      loadingColor,
      wrapperStyle,
      wrapperProps,
      disabledColor,
      pressableConfig,
      disabledTitleStyle,
      disabledWrapperStyle,
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

    const memorizedWrapperStyle = useStyle<ViewStyle>(() => {
      return StyleSheet.flatten([{}, wrapperStyle]);
    }, [wrapperStyle]);

    const memorizedButtonStyle = useStyle<ViewStyle>(() => {
      const backgroundColor =
        mode === 'solid'
          ? disabled
            ? colors.disabled
            : colors?.[color as keyof DefaultThemeColorsProps] ||
              (color as string)
          : 'transparent';

      const defaultPadding = rs(DefaultSizes?.[size as SizeType]);

      const borderRadius =
        rs(DefaultSizes?.[radius as SizeType]) || (radius as number);

      return StyleSheet.flatten([
        {
          borderRadius,
          backgroundColor,
          paddingVertical: defaultPadding,
          paddingHorizontal: defaultPadding * 2,
        },
        buttonStyle,
      ]);
    }, [buttonStyle, color, colors, disabled, mode, radius, rs, size]);

    const memorizedTitleStyle = useStyle<TextStyle>(() => {
      return StyleSheet.flatten([{}, titleStyle]);
    }, [titleStyle]);

    const accessibilityState = React.useMemo(() => {
      return {disabled: !!disabled, busy: !!loading};
    }, [disabled, loading]);

    const ContentWrapperView = React.useMemo(() => {
      return pressable ? Animated.View : React.Fragment;
    }, [pressable]);

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
          onPressIn?.(event);
        }
      },
      [disabled, loading, onFadeIn, onPressIn, pressable],
    );
    const onLongButtonPress = React.useCallback(
      (event: GestureResponderEvent) => {
        if (!loading && !disabled) {
          onLongPress?.(event);
        }
      },
      [disabled, loading, onLongPress],
    );

    return (
      <ContentWrapperView style={{transform: [{scale: value}]}}>
        <Wrapper
          testID="FAST_BASE_BUTTON_CONTAINER"
          style={memorizedWrapperStyle}
          {...wrapperProps}>
          <Pressable
            ref={ref}
            disabled={disabled}
            onPressOut={onFadeOut}
            onPress={onButtonPress}
            accessibilityRole="button"
            onPressIn={onButtonPressIn}
            style={memorizedButtonStyle}
            onLongPress={onLongButtonPress}
            accessibilityState={accessibilityState}
            testID="FAST_BASE_BUTTON"
            {...rest}>
            {loading ? (
              <ActivityIndicator
                size="small"
                testID="BUTTON_LOADER"
                color={loadingColor || colors?.secondText}
                {...loadingProps}
              />
            ) : typeof children === 'string' || !!title ? (
              <Text
                testID="FAST_BASE_BUTTON_TITLE"
                style={memorizedTitleStyle}
                {...titleProps}>
                {children || title}
              </Text>
            ) : (
              children
            )}
          </Pressable>
        </Wrapper>
      </ContentWrapperView>
    );
  },
);

Button.defaultProps = defaultProps;

export default Button;
