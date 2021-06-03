import React from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ContentProps} from '../core/types';

const Content: React.FC<ContentProps> = ({
  children,
  resetScrollToCoords,
  keyboardShouldPersistTaps,
  containerStyle,
  style,
  ...rest
}) => {
  const styles: StyleProp<ViewStyle> = {
    flex: 1,
  };

  return (
    <SafeAreaView style={[styles, containerStyle]}>
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        resetScrollToCoords={resetScrollToCoords ? undefined : {x: 0, y: 0}}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
        contentContainerStyle={style}
        {...rest}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Content);
