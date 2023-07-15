import {ReactNode} from 'react';
import Colors from '../default/colors';
import type {
  ViewStyle,
  StyleProp,
  ViewProps,
  TextStyle,
  ImageProps,
  FlexAlignType,
  PressableProps,
  ColorSchemeName,
  ActivityIndicatorProps,
  TextProps as NativeTextProps,
} from 'react-native';
import {Animated} from 'react-native';

export enum DefaultSizes {
  xs = 8,
  sm = 10,
  md = 12,
  lg = 14,
  xl = 18,
}
export enum DefaultTextSizes {
  xs = 12,
  sm = 14,
  md = 16,
  lg = 18,
  xl = 20,
}
export enum ImageSizes {
  xs = 10,
  sm = 12,
  md = 16,
  lg = 20,
  xl = 26,
  '2xl' = 30,
}
export type SOmit<S extends string> = S | Omit<string, S>;
export type SNOmit<S extends string | number> = S | Omit<string | number, S>;
export type AllColorsType =
  SOmit<`${keyof typeof Colors}-${keyof ColorsProps}`>;
export type PropsWithChildren<P = unknown> = P & {
  children?: React.ReactNode | undefined;
};
export type RenderNodeType = React.ReactNode | (() => React.ReactNode);
export type MappedType = {
  [key: string]: any;
};
export type AspectRatioType =
  | '16/9'
  | '4/3'
  | '1/1'
  | '2/3'
  | '9/16'
  | '3/2'
  | '5/3';
export type SizeType = keyof typeof DefaultSizes;
export type PrimaryColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';
export type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type FlexAlignYType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type WrapperModePropType =
  | 'normal'
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';
export type IconPropsType =
  | 'AntDesign'
  | 'Entypo'
  | 'MaterialIcons'
  | 'MaterMaterialCommunityIcons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'Ionicons'
  | 'Fontisto'
  | 'Feather'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';
export interface ColorsProps {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}
export type DefaultThemeColorsProps = Partial<
  {
    [key in PrimaryColorType]: string;
  } & {
    flat: string;
    text: string;
    surface: string;
    disabled: string;
    secondText: string;
    background: string;
  }
>;
export interface DefaultThemeContentProps {
  mode?: ColorSchemeName;
  defaultColors?: typeof Colors;
}
export type ThemeColorsProps<T extends MappedType = {}> =
  DefaultThemeColorsProps & {
    [P in keyof T]: T[P];
  };
export type ThemeContentProps<T extends MappedType = {}> =
  DefaultThemeContentProps & {
    colors?: ThemeColorsProps<T['colors']>;
  } & {
    [P in keyof T]: T[P];
  };
export interface ThemeProps<T extends MappedType = {}> {
  DarkTheme?: ThemeContentProps<T>;
  DefaultTheme?: ThemeContentProps<T>;
}
export type ThemeContextProps<T extends MappedType = {}> =
  ThemeContentProps<T> & {
    changeMode: (
      mode: ColorSchemeName,
      /**
       * you are able to execute your callback function after the theme mode is changed, such as
       * changing the Android navigation bar color, status bar color, etc.
       */
      changeModeCallback?: (newMode: ColorSchemeName) => void | Promise<void>,
    ) => void;
  };

export type ThemeProviderProps<T extends MappedType = {}> = Pick<
  DefaultThemeContentProps,
  'mode'
> & {
  theme?: ThemeProps<T>;
  /**
   * at default, if your phone's dark mode was enabled, the theme will change to dark mode.
   * You are able to set this property as false to avoid enabling system mode and the theme
   * will be handled manually.
   * @default true
   */
  enableSystemMode?: boolean;
};

export interface SpaceXYProps extends ViewProps, PropsWithChildren {
  /**
   * p is equal to padding style
   */
  p?: number;
  /**
   * px is equal to paddingHorizontal style
   */
  px?: number;
  /**
   * py is equal to paddingVertical style
   */
  py?: number;
  /**
   * pt is equal to paddingTop style
   */
  pt?: number;
  /**
   * pb is equal to paddingBottom style
   */
  pb?: number;
  /**
   * pr is equal to paddingRight style
   */
  pr?: number;
  /**
   * pl is equal to paddingLeft style
   */
  pl?: number;
  /**
   * pe is equal to paddingEnd style
   */
  pe?: number;
  /**
   * ps is equal to paddingStart style
   */
  ps?: number;
  /**
   * m is equal to margin style
   */
  m?: number;
  /**
   * mx is equal to marginHorizontal style
   */
  mx?: number;
  /**
   * my is equal to marginVertical style
   */
  my?: number;
  /**
   * mt is equal to marginTom style
   */
  mt?: number;

  /**
   * mb is equal to marginBottom style
   */
  mb?: number;
  /**
   * mr is equal to marginRight style
   */
  mr?: number;
  /**
   * ml is equal to marginLeft style
   */
  ml?: number;
  /**
   * me is equal to marginEnd style
   */
  me?: number;
  /**
   * ms is equal to marginStart style
   */
  ms?: number;
}
export interface WrapperProps extends SpaceXYProps {
  /**
   * the responsive width size using passed width percentage.
   * more info: https://github.com/Mhp23/react-native-full-responsive
   */
  width?: number;
  /**
   * the responsive height size using passed height percentage.
   * more info: https://github.com/Mhp23/react-native-full-responsive
   */
  height?: number;

  alignX?: FlexAlignType;

  alignY?: FlexAlignYType;

  self?: 'auto' | FlexAlignType;
  /**
   * this is a property to specify component flex direction
   */
  mode?: WrapperModePropType;
  /**
   * you are able to set a boolean or number value for this property, if the value of the flex
   * property is 'true', flex will consider '1', and if you passa number,a numeric value will be
   * considered for the flex value.
   */
  flex?: number | boolean;

  background?: AllColorsType;
}
export type ContainerProps = PropsWithChildren<
  ViewProps & Pick<WrapperProps, 'background'> & SpaceXYProps
>;
export interface TextProps<T extends string = ''> extends NativeTextProps {
  alignX?: TextAlignType;
  /**
   * font size of the component
   * @default 14
   */
  size?: number;
  /**
   * text color of the component, you are able to set a custom text color for
   * the text (as default the text color provided in the theme will consider)
   */
  color?: AllColorsType;
  /**
   * font of family of the component, you capable of to use your type as generic
   * in the text component.
   */
  font?: T;
}
export interface DividerProps extends ViewProps {
  /**
   * the direction of dividing two elements
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * dividing mode of two elements
   * @default border
   */
  mode?: 'padding' | 'border';
  /**
   * the border width of the divider, only works when the mode is `border`
   * @default 1
   */
  width?: number;
  /**
   * border color of the component, you are able to set a custom border color for
   * the Divider component (as default flat color provided in the theme will consider),
   * only works when the mode is `border`
   */
  color?: AllColorsType;

  style?: StyleProp<ViewStyle>;
}

export interface ButtonProps extends PressableProps {
  children: string | ReactNode;
  /**
   * button type, if the child of the button is text or that has the title,
   * the default type will be "primary"
   */
  type: PrimaryColorType;
  /**
   * button style mode could one of this modes.
   */
  mode: 'solid' | 'outline' | 'transparent';
  /**
   * button size, if the child of the button is text or that has the title,
   * the default type will be "md"
   */
  size: SizeType;
  /**
   * enabling activity indicator
   */
  loading: boolean;

  loadingColor: AllColorsType;
  /**
   * all availible properties in ActivityIndicator component
   */
  loadingProps: ActivityIndicatorProps;

  title: string;
  /**
   * button color
   */
  color: AllColorsType;

  titleStyle: StyleProp<TextStyle>;

  titleColor: AllColorsType;

  titleProps: TextProps;

  radius: SizeType | number;
  /**
   * only works on solid mode
   */
  shadow: 'low' | 'medium' | 'high' | boolean;

  disabledButtonColor: AllColorsType;

  disabledTitleColor: AllColorsType;

  disabledTitleStyle: StyleProp<TextStyle>;

  borderColor: AllColorsType;

  pressable: boolean;
  /**
   * in order to use custom pressable config includes pressIn
   * and pressOut config
   */
  pressableConfig: UseAnimationConfig;
  /**
   * @default 0.5
   */
  opacity: number | boolean;
  /**
   * in order to use custom opacity config includes pressIn config
   */
  opacityConfig: Pick<UseAnimationConfig, 'pressIn'>;
}
export interface UseAnimationConfig {
  pressIn?: Partial<Animated.TimingAnimationConfig>;
  pressOut?: Partial<Animated.TimingAnimationConfig>;
}
export interface FastBaseImageProps extends ImageProps {
  /**
   * image width, with using width and height, the size property will useless
   */
  w?: number;
  /**
   * image height, with using width and height, the size property will useless
   */
  h?: number;
  /**
   * should to use only one of the size property or width and height properties
   * @default md
   */
  size?: keyof typeof ImageSizes;

  radius?: keyof typeof ImageSizes | 'full' | number;
  /**
   * disable default react naitve image caching, it works will you use to specify image URI
   */
  noCache?: boolean;
  /**
   * image aspect ratio, could be string or number like:
   * "1/1"
   *  1/1
   *  1
   *  16/9
   */
  aspectRatio?: SNOmit<AspectRatioType>;
  /**
   * showing skeleton loading when image is loading
   * @default false
   */
  skeletonLoading?: boolean;

  loadingColor?: AllColorsType;
}

type EndResult = {finished: boolean};
type EndCallback = (result: EndResult) => void;
export interface CompositeAnimation {
  /**
   * Animations are started by calling start() on your animation.
   * start() takes a completion callback that will be called when the
   * animation is done or when the animation is done because stop() was
   * called on it before it could finish.
   *
   * @param callback - Optional function that will be called
   *      after the animation finished running normally or when the animation
   *      is done because stop() was called on it before it could finish
   *
   * @example
   *   Animated.timing({}).start(({ finished }) => {
   *    // completion callback
   *   });
   */
  start: (callback?: EndCallback) => void;
  /**
   * Stops any running animation.
   */
  stop: () => void;
  /**
   * Stops any running animation and resets the value to its original.
   */
  reset: () => void;
}
export interface ProgressProps {
  /**
   * using native driver or JS bridge
   * @default true
   */
  useNativeDriver?: boolean;
  /**
   * to fill progress bar right to left
   */
  isRTL?: boolean;
  /**
   * width of progress bar
   */
  w: number;
  /**
   * height of progress bar
   * @default md
   */
  h?: SizeType | number;
  /**
   * the progress value, should be between 0 to 100
   */
  value: number;
  /**
   * progress bar container background color
   * @default flat
   */
  background?: AllColorsType;
  /**
   * progress bar color
   * @default primary
   */
  progressColor?: AllColorsType;
  /**
   * progress bar container style
   */
  style?: StyleProp<ViewStyle>;
}
