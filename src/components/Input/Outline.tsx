import React from 'react';
import {useTheme} from '../../hooks';
import {useOutlineStyle} from './styles';
import Input, {defaultInputProps} from './Input';
import {InputRef, OutlineInputProps} from '../../core';
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

const DEFAULT_PADDING = 8;

const defaultProps: OutlineInputProps = {
  ...defaultInputProps,
  radius: 'xs',
};

const OutlineInput = React.forwardRef<InputRef, OutlineInputProps>(
  (
    {
      size,
      style,
      radius,
      invalid,
      inputStyle,
      leftElement,
      rightElement,
      invalidStyle,
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

    const [focused, setFocused] = React.useState<boolean>(false);

    const {containerStyle, textInputStyle} = useOutlineStyle({
      size,
      radius,
      focused,
      invalid,
      invalidStyle,
      focusedBorderColor,
      unFocusedBorderColor,
      hasLeftElement: !!leftElement,
      hasRightElement: !!rightElement,
    });
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
          onFocus?.(e);
        } else {
          onBlur?.(e);
        }
      },
      [onBlur, onFocus],
    );

    const leftElementParentProps = React.useMemo(() => {
      return {
        ps: DEFAULT_PADDING,
        me: DEFAULT_PADDING,
        pe: DEFAULT_PADDING / 2,
        background: colors?.flat,
        ...leftParentProps,
      };
    }, [colors?.flat, leftParentProps]);

    const rightElementParentProps = React.useMemo(() => {
      return {
        pe: DEFAULT_PADDING,
        ms: DEFAULT_PADDING,
        ps: DEFAULT_PADDING / 2,
        background: colors?.flat,
        ...rightParentProps,
      };
    }, [colors?.flat, rightParentProps]);

    return (
      <Input
        ref={ref}
        size={size}
        mode="outline"
        invalid={invalid}
        leftElement={leftElement}
        rightElement={rightElement}
        onBlur={e => onInputFocus(e, false)}
        onFocus={e => onInputFocus(e, true)}
        leftParentProps={leftElementParentProps}
        rightParentProps={rightElementParentProps}
        style={[containerStyle, style]}
        inputStyle={[textInputStyle, inputStyle]}
        {...rest}
      />
    );
  },
);

OutlineInput.defaultProps = defaultProps;

export default OutlineInput;
