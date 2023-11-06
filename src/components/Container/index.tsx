import React from 'react';
import {colorSelector, makeLayoutStyle} from '../../utils';
import type {ContainerProps, PropsWithLayout} from '../../core';
import {type ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSpaceStyle, useStyle, useTheme} from '../../hooks';
import InjectLayout from '../InjectLayout';

const defaultProps: ContainerProps = {
  p: 0,
  px: 0,
  py: 0,
  pt: 0,
  pb: 0,
  pr: 0,
  pl: 0,
  pe: 0,
  ps: 0,
  m: 0,
  mx: 0,
  my: 0,
  mt: 0,
  mb: 0,
  ml: 0,
  mr: 0,
  me: 0,
  ms: 0,
};

const Container = React.forwardRef<any, PropsWithLayout<ContainerProps>>(
  (
    {
      p,
      px,
      py,
      pt,
      pb,
      pr,
      pl,
      pe,
      ps,
      m,
      mx,
      my,
      mt,
      mb,
      mr,
      ml,
      me,
      ms,
      style,
      children,
      background,
      dir: direction,
      ...rest
    },
    ref,
  ) => {
    const {dir, colors} = useTheme();

    const spaceStyle = useSpaceStyle({
      p,
      px,
      py,
      pt,
      pb,
      pr,
      pl,
      pe,
      ps,
      m,
      mx,
      my,
      mt,
      mb,
      mr,
      ml,
      me,
      ms,
    });

    const containerStyles = useStyle<ViewStyle>(() => {
      const backgroundColor = colorSelector(background) || colors?.background;
      return {flex: 1, backgroundColor};
    }, [background, colors?.background]);

    const containerLayoutStyle = useStyle(() => {
      return makeLayoutStyle(
        [containerStyles, spaceStyle, style],
        direction ?? dir,
      );
    }, [containerStyles, dir, direction, spaceStyle, style]);

    return (
      <SafeAreaView
        ref={ref}
        testID="FAST_BASE_CONTAINER"
        style={containerLayoutStyle}
        {...rest}>
        <InjectLayout dir={direction}>{children}</InjectLayout>
      </SafeAreaView>
    );
  },
);

Container.defaultProps = defaultProps;

export default Container;
