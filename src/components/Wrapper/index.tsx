import React from 'react';
import {useStyle} from '../../hooks';
import type {WrapperProps} from '../../core';
import {useRM} from 'react-native-full-responsive';
import {colorSelector, makeStyle} from '../../utils';
import {StyleSheet, View, type ViewStyle} from 'react-native';

const defaultProps: WrapperProps = {
  mode: 'normal',
  flex: false,
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

const Wrapper = React.forwardRef<View, WrapperProps>(
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
      self,
      flex,
      mode,
      style,
      width,
      height,
      alignX,
      alignY,
      children,
      background,
      ...rest
    },
    ref,
  ) => {
    const {rs, rh, rw} = useRM();

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
        alignItems: alignX,
        justifyContent: alignY,
        ...(mode !== 'normal' && {
          flexDirection: mode,
          flexWrap: 'wrap',
        }),
      });
    }, [rw, rh, self, alignX, alignY, width, height, flex, mode]);

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
      <View
        ref={ref}
        style={StyleSheet.flatten([
          backgroundStyle,
          wrapperStyles,
          spacesStyles,
          style,
        ])}
        testID="FAST_BASE_WRAPPER"
        {...rest}>
        {children}
      </View>
    );
  },
);

Wrapper.defaultProps = defaultProps;

export default Wrapper;
