import {type DependencyList, useMemo} from 'react';
import type {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';

const useStyle = <T extends ViewStyle | TextStyle | ImageStyle>(
  factory: () => T,
  deps?: DependencyList,
): StyleProp<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
};

export default useStyle;
