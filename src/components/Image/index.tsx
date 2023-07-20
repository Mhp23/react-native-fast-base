import React from 'react';
import {useStyle} from '../../hooks';
import {colorSelector} from '../../utils';
import {useRM} from 'react-native-full-responsive';
import {CompositeAnimation, FastBaseImageProps, ImageSizes} from '../../core';
import {
  Animated,
  ImageStyle,
  StyleSheet,
  ImageURISource,
  ImageSourcePropType,
  Image as NativeImage,
  ImageErrorEventData,
  NativeSyntheticEvent,
} from 'react-native';

const defaultSize: Omit<FastBaseImageProps, 'source'> = {
  size: 'md',
};

const DEFAULT_OPACITY = 0.3;

const Image = React.forwardRef<NativeImage, FastBaseImageProps>(
  (
    {
      w,
      h,
      size,
      style,
      source,
      radius,
      noCache,
      aspectRatio,
      loadingColor,
      skeletonLoading,
      onError,
      onLoadEnd,
      onLoadStart,
      ...rest
    },
    ref: any,
  ) => {
    const {rs, rh} = useRM();

    const animatedValue = React.useRef<CompositeAnimation>();

    const animatedOpacity = React.useRef(
      new Animated.Value(skeletonLoading ? DEFAULT_OPACITY : 1),
    );

    const imageStyle = useStyle(() => {
      const imgStyles: ImageStyle = {};
      if (!w && !h) {
        if (size in ImageSizes) {
          Object.assign(imgStyles, {
            height: rh(ImageSizes[size]),
            width: rh(ImageSizes[size]),
          });
        } else {
          throw new Error(
            `Size should be one of the "xs, sm, md, lg, xl, 2xl" value`,
          );
        }
      } else {
        if (w) {
          Object.assign(imgStyles, {width: rs(w)});
        }
        if (h) {
          Object.assign(imgStyles, {height: rs(h)});
        }
      }
      if (aspectRatio) {
        Object.assign(imgStyles, {aspectRatio});
      }
      if (radius === 'full') {
        Object.assign(imgStyles, {
          borderRadius: imgStyles.height || imgStyles.width || 150,
        });
      } else if (radius in ImageSizes) {
        Object.assign(imgStyles, {borderRadius: ImageSizes[radius]});
      } else if (typeof radius === 'number') {
        Object.assign(imgStyles, {borderRadius: radius});
      }
      return imgStyles;
    }, [w, h, aspectRatio, radius, size, rh, rs]);

    const animationStyle = useStyle(() => {
      return {
        borderRadius: (imageStyle as ImageStyle).borderRadius,
        backgroundColor: colorSelector(loadingColor) || 'gray',
      };
    }, [imageStyle, loadingColor]);

    const imageSource = React.useMemo(() => {
      let newSource: ImageSourcePropType = source;
      if (typeof source === 'object') {
        const imageURI = 'uri' in source ? source.uri : '';
        newSource = {
          ...source,
          uri: noCache ? `${imageURI}?${new Date()}` : imageURI,
        };
      } else if (Array.isArray(source)) {
        newSource = source.map((imgSource: ImageURISource) => {
          const imageURI = 'uri' in imgSource ? imgSource.uri : '';
          return {
            ...imgSource,
            uri: noCache ? `${imageURI}?${new Date()}` : imageURI,
          };
        });
      }
      return newSource;
    }, [noCache, source]);

    const onImageLoadStart = React.useCallback(() => {
      if (skeletonLoading) {
        animatedValue.current = Animated.loop(
          Animated.sequence([
            Animated.timing(animatedOpacity.current, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }),
            Animated.timing(animatedOpacity.current, {
              toValue: DEFAULT_OPACITY,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
        );
        animatedValue.current?.start();
      }
      onLoadStart?.();
    }, [onLoadStart, skeletonLoading]);

    const onImageLoadEnd = React.useCallback(() => {
      if (skeletonLoading) {
        animatedValue.current?.reset();
        animatedOpacity.current.setValue(1);
      }
      onLoadEnd?.();
    }, [onLoadEnd, skeletonLoading]);

    const onImageError = React.useCallback(
      (error: NativeSyntheticEvent<ImageErrorEventData>) => {
        console.warn(error.nativeEvent.error);
        onError?.(error);
      },
      [onError],
    );

    const RenderComponentView = React.useCallback(
      (children: React.ReactNode) => {
        return skeletonLoading ? (
          <Animated.View
            style={[animationStyle, {opacity: animatedOpacity.current}]}>
            {children}
          </Animated.View>
        ) : (
          <React.Fragment>{children}</React.Fragment>
        );
      },
      [animationStyle, skeletonLoading],
    );

    return RenderComponentView(
      <NativeImage
        ref={ref}
        source={imageSource}
        testID="FAST_BASE_IMAGE"
        accessibilityRole="image"
        style={StyleSheet.flatten([imageStyle, style])}
        {...rest}
        onError={onImageError}
        onLoadEnd={onImageLoadEnd}
        onLoadStart={onImageLoadStart}
      />,
    );
  },
);

Image.defaultProps = defaultSize;

export default Image;