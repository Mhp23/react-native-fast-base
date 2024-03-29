import React from 'react';
import {useSpaceStyle, useStyle, useTheme} from '../../hooks';
import type {PropsWithLayout, WrapperProps} from '../../core';
import {useRM} from 'react-native-full-responsive';
import {colorSelector, makeStyle, makeLayoutStyle} from '../../utils';
import {View, type ViewStyle} from 'react-native';
import InjectLayout from '../InjectLayout';

const defaultProps: WrapperProps = {
  mode: 'normal',
  flex: false,
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
  mr: 0,
  ml: 0,
  me: 0,
  ms: 0,
};

const Wrapper = React.forwardRef<View, PropsWithLayout<WrapperProps>>(
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
      ax,
      ay,
      self,
      flex,
      mode,
      style,
      width,
      height,
      children,
      background,
      dir: direction,
      ...rest
    },
    ref,
  ) => {
    const {dir} = useTheme();

    const {rh, rw} = useRM();

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

    const backgroundStyle = useStyle(() => {
      const bgColor = colorSelector(background);
      return bgColor && {backgroundColor: bgColor};
    }, [background]);

    const wrapperStyles = useStyle<ViewStyle>(() => {
      const wrapperFlex = (typeof flex === 'number' && flex) || (flex && 1);
      return makeStyle<ViewStyle>({
        flex: wrapperFlex,
        width: rw(width),
        height: rh(height),
        alignSelf: self,
        alignItems: ax,
        justifyContent: ay,
        ...(mode !== 'normal' && {
          flexDirection: mode,
          flexWrap: 'wrap',
        }),
      });
    }, [rw, rh, self, ax, ay, width, height, flex, mode]);

    const layoutStyle = useStyle<ViewStyle>(() => {
      return makeLayoutStyle(
        [backgroundStyle, wrapperStyles, spaceStyle, style],
        direction ?? dir,
      );
    }, [backgroundStyle, dir, direction, spaceStyle, style, wrapperStyles]);

    return (
      <View ref={ref} style={layoutStyle} testID="FAST_BASE_WRAPPER" {...rest}>
        <InjectLayout dir={direction}>{children}</InjectLayout>
      </View>
    );
  },
);

Wrapper.defaultProps = defaultProps;

export default Wrapper;
