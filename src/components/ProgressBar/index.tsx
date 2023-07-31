import React from 'react';
import {colorSelector} from '../../utils';
import {useStyle, useTheme} from '../../hooks';
import {useRM} from 'react-native-full-responsive';
import {Animated, StyleSheet, View} from 'react-native';
import {DefaultSizes, PrimaryColors, ProgressProps} from '../../core';

const MIN_VALUE = 0;
const MAX_VALUE = 100;

const defaultProps: Omit<ProgressProps, 'width' | 'value'> = {
  height: 'md',
  useNativeDriver: true,
};

const Progress: React.FC<ProgressProps> = ({
  style,
  value,
  isRTL,
  width,
  height,
  background,
  progressColor,
  useNativeDriver,
}) => {
  const {rs} = useRM();

  const {colors} = useTheme();

  const animatedWidth = React.useRef(new Animated.Value(value));

  const progressWidth = React.useMemo(() => {
    if (typeof width === 'number') {
      return rs(width);
    } else {
      throw new Error('width of progress bar should be numeric value');
    }
  }, [rs, width]);

  const containerStyle = useStyle(() => {
    const progressHeight = rs(
      typeof height === 'number' ? height : DefaultSizes[height] - 2,
    );
    const backgroundColor = colorSelector(background) || colors?.flat;
    return StyleSheet.flatten([
      {
        backgroundColor,
        overflow: 'hidden',
        width: progressWidth,
        height: progressHeight,
        borderRadius: progressWidth / 2,
      },
      style,
    ]);
  }, [rs, height, background, colors?.flat, progressWidth, style]);

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
        testID="FAST_BASE_PROGRESS_BAR"
        style={[
          progressBarStyle,
          {
            transform: [
              {
                translateX: animatedWidth.current.interpolate({
                  inputRange: [0, 100],
                  outputRange: [
                    (isRTL ? progressWidth : -1 * progressWidth) / 2,
                    0,
                  ],
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
