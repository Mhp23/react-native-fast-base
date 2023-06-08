import React from 'react';
import {useStyle, useTheme} from '../../hooks';
import type {ContainerProps} from '../../core';
import {SafeAreaView, StyleSheet, type ViewStyle} from 'react-native';

const Container = React.forwardRef<SafeAreaView, ContainerProps>(
  ({children, background, style, ...rest}, ref) => {
    const {colors} = useTheme();

    const containerStyles = useStyle<ViewStyle>(() => {
      return {
        flex: 1,
        backgroundColor: background || colors?.background,
      };
    }, [background, colors?.background]);

    return (
      <SafeAreaView
        ref={ref}
        testID="FAST_BASE_CONTAINER"
        style={StyleSheet.flatten([containerStyles, style])}
        {...rest}>
        {children}
      </SafeAreaView>
    );
  },
);

export default Container;
