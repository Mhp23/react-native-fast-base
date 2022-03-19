import React from 'react';
import {useTheme} from '../../hooks';
import {
  Platform,
  ViewProps,
  StyleProp,
  ViewStyle,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const Container: React.FC<ViewProps> = ({children, style}) => {
  const {colors} = useTheme();

  const containerStyles: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: colors?.background,
    height: Platform.select({
      android: DEVICE_HEIGHT,
      ios: DEVICE_HEIGHT - 20,
    }),
  };

  return (
    <SafeAreaView testID="FAST_BASE_CONTAINER" style={[containerStyles, style]}>
      {children}
    </SafeAreaView>
  );
};

export default Container;
