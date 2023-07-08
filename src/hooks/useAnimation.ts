import React from 'react';
import {Animated} from 'react-native';
import {UseAnimationConfig} from '../core';
import deepmerge from 'deepmerge';

const PRESS_IN_CONFIG: Animated.TimingAnimationConfig = {
  toValue: 0.9,
  duration: 200,
  useNativeDriver: true,
};

const PRESS_OUT_CONFIG: Animated.TimingAnimationConfig = {
  toValue: 1,
  duration: 200,
  useNativeDriver: true,
};

const useAnimation = (config?: UseAnimationConfig) => {
  const value = React.useRef<Animated.Value>(new Animated.Value(1)).current;

  const animatedInConfig = React.useMemo(() => {
    return deepmerge(PRESS_IN_CONFIG, config?.pressIn || {});
  }, [config?.pressIn]);

  const animatedOutConfig = React.useMemo(() => {
    return deepmerge(PRESS_OUT_CONFIG, config?.pressOut || {});
  }, [config?.pressOut]);

  const onFadeIn = React.useCallback(() => {
    Animated.timing(value, animatedInConfig).start();
  }, [animatedInConfig, value]);

  const onFadeOut = React.useCallback(() => {
    Animated.timing(value, animatedOutConfig).start();
  }, [animatedOutConfig, value]);

  return {value, onFadeIn, onFadeOut};
};

export default useAnimation;
