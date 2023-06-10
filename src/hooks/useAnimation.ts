import React from 'react';
import {Animated} from 'react-native';
import {UseAnimationConfig} from '../core';

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

  const onFadeIn = React.useCallback(() => {
    Animated.timing(value, config?.pressIn || PRESS_IN_CONFIG).start();
  }, [config?.pressIn, value]);

  const onFadeOut = React.useCallback(() => {
    Animated.timing(value, config?.pressOut || PRESS_OUT_CONFIG).start();
  }, [config?.pressOut, value]);

  return {value, onFadeIn, onFadeOut};
};

export default useAnimation;
