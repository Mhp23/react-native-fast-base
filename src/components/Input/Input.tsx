import Text from '../Text';
import Wrapper from '../Wrapper';
import {renderNode} from '../../utils';
import {useInputStyle} from './styles';
import {useStyle, useTheme} from '../../hooks';
import React, {useImperativeHandle} from 'react';
import {Animated, StyleSheet, TextInput} from 'react-native';
import {InputRef, InputProps, RenderNodeType} from '../../core';

const DEFAULT_LABEL_MARGIN = 8;

export const defaultInputProps: InputProps = {
  size: 'md',
  invalid: false,
  readonly: false,
  disabled: false,
  useNativeDriver: true,
};

const Input = React.forwardRef<
  InputRef,
  InputProps & {
    mode: 'outline' | 'underline';
    borderChildren?: RenderNodeType;
  }
>(
  (
    {
      mode,
      size,
      style,
      label,
      invalid,
      children,
      disabled,
      readonly,
      passowrd,
      multiline,
      hintLabel,
      labelStyle,
      inputStyle,
      background,
      leftElement,
      rightElement,
      invalidLabel,
      hintLabelStyle,
      containerStyle,
      borderChildren,
      useNativeDriver,
      leftParentProps,
      rightParentProps,
      invalidLabelStyle,
      ...rest
    },
    ref: any,
  ) => {
    const {colors} = useTheme();

    const inputRef = React.useRef<TextInput>(null);

    const shakeAnimated = React.useRef(new Animated.Value(0));

    const bounceAnimated = React.useRef(new Animated.Value(0));

    const {wrapperStyle, textInputStyle} = useInputStyle({
      size,
      disabled,
      background,
      inputStyle,
    });

    const inputLabelStyle = useStyle(() => {
      return StyleSheet.flatten([
        {
          fontWeight: '600',
          color: colors?.secondText,
          fontSize: textInputStyle.fontSize,
        },
        labelStyle,
      ]);
    }, [colors?.secondText, labelStyle, textInputStyle.fontSize]);

    const inputHintLabelStyle = useStyle(() => {
      return StyleSheet.flatten([
        {
          color: colors?.secondText,
          fontSize: textInputStyle.fontSize * 0.9,
        },
        hintLabelStyle,
      ]);
    }, [colors?.secondText, hintLabelStyle, textInputStyle.fontSize]);

    const inputInvalidLabelStyle = useStyle(() => {
      return StyleSheet.flatten([
        {
          color: colors?.error,
          fontSize: textInputStyle.fontSize * 0.9,
        },
        invalidLabelStyle,
      ]);
    }, [colors?.error, invalidLabelStyle, textInputStyle.fontSize]);

    const placeHolderColor = React.useMemo(() => {
      return disabled ? colors.disabled : colors?.secondText;
    }, [colors.disabled, colors?.secondText, disabled]);

    const isDisabled = React.useMemo(() => {
      return disabled || readonly;
    }, [disabled, readonly]);

    const onAnimate = React.useCallback(
      (type: 'shake' | 'bounce', duration: number) => {
        const animatedValue =
          type === 'shake' ? shakeAnimated.current : bounceAnimated.current;
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver,
        }).start(({finished}) => {
          if (finished) {
            animatedValue.setValue(0);
          }
        });
      },
      [useNativeDriver],
    );

    useImperativeHandle(ref, () => {
      return {
        blur: () => inputRef.current.blur(),
        clear: () => inputRef.current.clear(),
        focus: () => inputRef.current.focus(),
        isFocused: () => inputRef.current.isFocused(),
        setNativeProps: (nativeProps: object) =>
          inputRef.current.setNativeProps(nativeProps),
        shake: (duration = 600) => onAnimate('shake', duration),
        bounce: (duration = 600) => onAnimate('bounce', duration),
      };
    });

    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                translateX: shakeAnimated.current.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 0.9, 1],
                  outputRange: [0, -12, 12, -6, 6, 0],
                }),
              },
              {
                translateY: bounceAnimated.current.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 0.9, 1],
                  outputRange: [0, -6, 6, -3, 3, 0],
                }),
              },
            ],
          },
          containerStyle,
        ]}>
        {!label ? null : typeof label !== 'string' ? (
          renderNode(label)
        ) : (
          <Text style={inputLabelStyle}>{label}</Text>
        )}
        <Wrapper
          mt={
            !!label && mode === 'underline'
              ? DEFAULT_LABEL_MARGIN / 2
              : DEFAULT_LABEL_MARGIN
          }
          mb={
            ((!!invalid && !!invalidLabel) || !!hintLabel) &&
            DEFAULT_LABEL_MARGIN
          }
          style={StyleSheet.flatten([wrapperStyle, style])}
          mode="row">
          {!leftElement ? null : (
            <Wrapper ay="center" {...leftParentProps}>
              {renderNode(leftElement)}
            </Wrapper>
          )}
          <TextInput
            accessible
            ref={inputRef}
            children={children}
            multiline={multiline}
            editable={!isDisabled}
            style={textInputStyle}
            secureTextEntry={!!passowrd}
            placeholderTextColor={placeHolderColor}
            {...rest}
          />
          {!rightElement ? null : (
            <Wrapper ay="center" {...rightParentProps}>
              {renderNode(rightElement)}
            </Wrapper>
          )}
          {borderChildren}
        </Wrapper>
        {!invalid ? (
          !hintLabel ? null : typeof hintLabel === 'string' ? (
            <Text style={inputHintLabelStyle}>{hintLabel}</Text>
          ) : (
            renderNode(hintLabel)
          )
        ) : !invalidLabel ? null : typeof invalidLabel !== 'string' ? (
          renderNode(invalidLabel)
        ) : (
          <Text style={inputInvalidLabelStyle}>{invalidLabel}</Text>
        )}
      </Animated.View>
    );
  },
);

Input.defaultProps = defaultInputProps;

export default Input;
