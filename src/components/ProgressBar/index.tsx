import React from 'react';
import {colorSelector} from '../../utils';
import {useStyle, useTheme} from '../../hooks';
import {useRM} from 'react-native-full-responsive';
import {Animated, StyleSheet, View} from 'react-native';
import {DefaultSizes, PrimaryColors, ProgressProps} from '../../core';

const MIN_VALUE = 0;
const MAX_VALUE = 100;

const defaultProps: Omit<ProgressProps, 'w' | 'value'> = {
  h: 'md',
  useNativeDriver: true,
};

const Progress: React.FC<ProgressProps> = ({
  w,
  h,
  style,
  value,
  isRTL,
  background,
  progressColor,
  useNativeDriver,
}) => {
  const {rs} = useRM();

  const {colors} = useTheme();

  const animatedWidth = React.useRef(new Animated.Value(value));

  const width = React.useMemo(() => {
    if (typeof w === 'number') {
      return rs(w);
    } else {
      throw new Error('width of progress bar should be numeric value');
    }
  }, [rs, w]);

  const containerStyle = useStyle(() => {
    const height = rs(typeof h === 'number' ? h : DefaultSizes[h] - 2);
    const backgroundColor = colorSelector(background) || colors?.flat;
    return StyleSheet.flatten([
      {
        width,
        height,
        backgroundColor,
        overflow: 'hidden',
        borderRadius: w / 2,
      },
      style,
    ]);
  }, [rs, h, background, w, style, width, colors?.flat]);

  const progressBarStyle = useStyle(() => {
    const backgroundColor =
      colorSelector(progressColor) || PrimaryColors.primary;
    return {
      width: '100%',
      height: '100%',
      backgroundColor,
    };
  }, [progressColor]);

  React.useEffect(() => {
    /**
     * set progress value between 0 to 100 if was been outside of this range
     */
    const toValue = Math.min(Math.max(value, MIN_VALUE), MAX_VALUE);

    Animated.spring(animatedWidth.current, {
      toValue,
      useNativeDriver,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View style={containerStyle}>
      <Animated.View
        style={[
          progressBarStyle,
          {
            transform: [
              {
                translateX: animatedWidth.current.interpolate({
                  inputRange: [0, 100],
                  outputRange: [(isRTL ? width : -1 * width) / 2, 0],
                }),
              },
              {
                scaleX: animatedWidth.current.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

Progress.defaultProps = defaultProps;

export default Progress;
