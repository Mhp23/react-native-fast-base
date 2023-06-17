import useStyle from './useStyle';
import {makeStyle} from '../utils';
import {SpaceXYProps} from '../core';
import {useRM} from 'react-native-full-responsive';
import {StyleProp, ViewStyle} from 'react-native';

const useSpaceStyle = ({
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
}: SpaceXYProps): StyleProp<ViewStyle> => {
  const {rs} = useRM();

  return useStyle<ViewStyle>(() => {
    return makeStyle<ViewStyle>({
      padding: rs(p),
      paddingEnd: rs(pe),
      paddingTop: rs(pt),
      paddingStart: rs(ps),
      paddingBottom: rs(pb),
      paddingRight: rs(pr),
      paddingLeft: rs(pl),
      paddingVertical: rs(py),
      paddingHorizontal: rs(px),
      margin: rs(m),
      marginEnd: rs(me),
      marginTop: rs(mt),
      marginStart: rs(ms),
      marginBottom: rs(mb),
      marginRight: rs(mr),
      marginLeft: rs(ml),
      marginVertical: rs(my),
      marginHorizontal: rs(mx),
    });
  }, [
    rs,
    p,
    pe,
    pt,
    ps,
    pb,
    pr,
    pl,
    py,
    px,
    m,
    me,
    mt,
    ms,
    mb,
    mr,
    ml,
    my,
    mx,
  ]);
};

export default useSpaceStyle;
