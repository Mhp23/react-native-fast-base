import React from 'react';
import deepmerge from 'deepmerge';
import {Animated} from 'react-native';
import {UseAnimationConfig} from '../core';

export const PRESS_IN_CONFIG: Animated.TimingAnimationConfig = {
  toValue: 0.5,
  duration: 100,
  useNativeDriver: true,
};

const PRESS_OUT_CONFIG: Animated.TimingAnimationConfig = {
  toValue: 1,
  duration: 100,
  useNativeDriver: true,
};

const useOpacity = (opacityConfig?: Pick<UseAnimationConfig, 'pressIn'>) => {
  const opacityValue = React.useRef<Animated.Value>(
    new Animated.Value(1),
  ).current;

  const animatedInConfig = React.useMemo(() => {
    return deepmerge(PRESS_IN_CONFIG, opacityConfig?.pressIn || {});
  }, [opacityConfig?.pressIn]);

  const onOpacityIn = React.useCallback(() => {
    Animated.timing(opacityValue, animatedInConfig).start();
  }, [animatedInConfig, opacityValue]);

  const onOpacityOut = React.useCallback(() => {
    Animated.timing(opacityValue, PRESS_OUT_CONFIG).start();
  }, [opacityValue]);

  return {opacityValue, onOpacityIn, onOpacityOut};
};

export default useOpacity;
