import React from 'react';
import {colorSelector, makeStyle} from '../../utils';
import {useStyle, useTheme} from '../../hooks';
import type {ContainerProps} from '../../core';
import {
  StyleSheet,
  type ViewStyle,
  SafeAreaView as RNSafeAreaView,
} from 'react-native';
import {useRM} from 'react-native-full-responsive';
import {SafeAreaView} from 'react-native-safe-area-context';

const defaultProps: ContainerProps = {
  p: 0,
  px: 0,
  py: 0,
  pt: 0,
  pb: 0,
  pe: 0,
  ps: 0,
  m: 0,
  mx: 0,
  my: 0,
  mt: 0,
  mb: 0,
  me: 0,
  ms: 0,
};

const Container = React.forwardRef<RNSafeAreaView, ContainerProps>(
  (
    {
      p,
      px,
      py,
      pt,
      pb,
      pe,
      ps,
      m,
      mx,
      my,
      mt,
      mb,
      me,
      ms,
      style,
      children,
      background,
      ...rest
    },
    ref,
  ) => {
    const {colors} = useTheme();

    const {rs} = useRM();

    const containerStyles = useStyle<ViewStyle>(() => {
      const backgroundColor = colorSelector(background) || colors?.background;
      return {flex: 1, backgroundColor};
    }, [background, colors?.background]);

    const spacesStyles = useStyle<ViewStyle>(() => {
      return makeStyle<ViewStyle>({
        padding: rs(p),
        paddingEnd: rs(pe),
        paddingTop: rs(pt),
        paddingStart: rs(ps),
        paddingBottom: rs(pb),
        paddingVertical: rs(py),
        paddingHorizontal: rs(px),
        margin: rs(m),
        marginEnd: rs(me),
        marginTop: rs(mt),
        marginStart: rs(ms),
        marginBottom: rs(mb),
        marginVertical: rs(my),
        marginHorizontal: rs(mx),
      });
    }, [rs, p, pe, pt, ps, pb, py, px, m, me, mt, ms, mb, my, mx]);

    return (
      <SafeAreaView
        ref={ref}
        testID="FAST_BASE_CONTAINER"
        style={StyleSheet.flatten([containerStyles, spacesStyles, style])}
        {...rest}>
        {children}
      </SafeAreaView>
    );
  },
);

Container.defaultProps = defaultProps;

export default Container;
