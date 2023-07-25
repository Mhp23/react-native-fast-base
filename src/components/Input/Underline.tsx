import React from 'react';
import {useBorder} from './styles';
import {useStyle, useTheme} from '../../hooks';
import {InputRef, UnderlineInputProps} from '../../core';
import Input, {defaultInputProps} from './Input';
import {
  Easing,
  Animated,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

const DEFAULT_DURATION = 250;

const DEFAULT_PADDING = 8;

const defaultProps: UnderlineInputProps = {
  ...defaultInputProps,
  animatable: true,
  focusDuration: DEFAULT_DURATION,
  blurDuration: DEFAULT_DURATION - 50,
};

const UnderlineInput = React.forwardRef<InputRef, UnderlineInputProps>(
  (
    {
      style,
      invalid,
      disabled,
      readonly,
      animatable,
      borderWidth,
      invalidStyle,
      blurDuration,
      focusDuration,
      leftParentProps,
      rightParentProps,
      focusedBorderColor,
      unFocusedBorderColor,
      onBlur,
      onFocus,
      ...rest
    },
    ref: any,
  ) => {
    const {colors} = useTheme();

    const animatedValue = React.useRef(new Animated.Value(0));

    const [focused, setFocused] = React.useState<boolean>(false);
    /**
     * to apply the invalid style only the invalid property is enabled and input is unfocused
     */
    const isInvalid = invalid && !focused;

    const bordeStyle = useBorder({
      focused,
      invalid,
      borderWidth,
      invalidStyle,
      focusedBorderColor,
      unFocusedBorderColor,
    });

    const containerStyle = useStyle(() => {
      return {
        borderBottomWidth: bordeStyle.width,
        borderBottomColor: disabled
          ? colors?.disabled
          : animatable
          ? bordeStyle.unFocusedColor
          : bordeStyle.color,
      };
    }, [
      disabled,
      animatable,
      colors?.disabled,
      bordeStyle.color,
      bordeStyle.width,
      bordeStyle.unFocusedColor,
    ]);

    const animatedBorderStyle = useStyle(() => {
      return {
        width: '100%',
        position: 'absolute',
        height: bordeStyle.width,
        bottom: -1 * bordeStyle.width,
        backgroundColor: bordeStyle.focusedColor,
      };
    }, [bordeStyle.focusedColor, bordeStyle.width]);
    /**
     * to handle onFocus and onBlur on text input
     */
    const onInputFocus = React.useCallback(
      (
        e: NativeSyntheticEvent<TextInputFocusEventData>,
        isFocused: boolean,
      ) => {
        setFocused(isFocused);

        if (isFocused) {
          Animated.timing(animatedValue.current, {
            toValue: 1,
            easing: Easing.linear,
            useNativeDriver: true,
            duration: focusDuration,
          }).start();

          onFocus?.(e);
        } else {
          Animated.timing(animatedValue.current, {
            toValue: 0,
            easing: Easing.linear,
            useNativeDriver: true,
            duration: blurDuration,
          }).start();

          onBlur?.(e);
        }
      },
      [blurDuration, focusDuration, onBlur, onFocus],
    );

    const BorderChildrenComponent = React.useMemo(() => {
      return (
        animatable && (
          <Animated.View
            style={[
              animatedBorderStyle,
              {
                transform: [
                  {
                    scaleX: animatedValue.current,
                  },
                ],
              },
            ]}
          />
        )
      );
    }, [animatable, animatedBorderStyle]);

    const leftElementParentProps = React.useMemo(() => {
      return {me: DEFAULT_PADDING, ...leftParentProps};
    }, [leftParentProps]);

    const rightElementParentProps = React.useMemo(() => {
      return {ms: DEFAULT_PADDING, ...rightParentProps};
    }, [rightParentProps]);

    return (
      <React.Fragment>
        <Input
          ref={ref}
          mode="underline"
          invalid={invalid}
          readonly={readonly}
          disabled={disabled}
          onBlur={e => onInputFocus(e, false)}
          onFocus={e => onInputFocus(e, true)}
          leftParentProps={leftElementParentProps}
          rightParentProps={rightElementParentProps}
          style={StyleSheet.flatten([
            containerStyle,
            style,
            isInvalid && invalidStyle,
          ])}
          {...rest}
          borderChildren={BorderChildrenComponent}
        />
      </React.Fragment>
    );
  },
);

UnderlineInput.defaultProps = defaultProps;

export default UnderlineInput;
